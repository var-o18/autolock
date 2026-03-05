import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FB_URL = 'https://www.facebook.com/autolock/posts/?locale=es_ES';
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'facebookPosts.json');

/**
 * Realiza el scraping de las publicaciones de la página de Facebook de Autolock.
 */
const scrapeFacebook = async () => {
    console.log('Iniciando scraping de Facebook...');
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-notifications',
            '--lang=es-ES'
        ]
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 1600 });

    try {
        await page.goto(FB_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // Intentar cerrar banners de cookies o login si aparecen
        try {
            await new Promise(r => setTimeout(r, 2000));
            const closeButtons = await page.$$('[aria-label="Cerrar"], [aria-label="Not now"], .x92rt8u');
            for (const btn of closeButtons) {
                await btn.click().catch(() => {});
            }
        } catch (e) {
            // Error silencioso al intentar cerrar banners
        }

        await page.waitForSelector('div[role="main"]', { timeout: 30000 });

        console.log('Haciendo scroll para cargar todas las imágenes...');
        // Realizar scroll progresivo para activar la carga diferida (lazy loading) de imágenes
        for (let i = 0; i < 10; i++) {
            await page.evaluate(() => window.scrollBy(0, 600));
            await new Promise(r => setTimeout(r, 1500));
        }

        const posts = await page.evaluate(() => {
            // Selectores para contenedores de publicaciones actuales
            const potentialArticles = Array.from(document.querySelectorAll('div[role="article"]'));
            
            console.log(`Encontrados ${potentialArticles.length} artículos`);
            
            const results = [];
            for (const article of potentialArticles) {
                // 1. Obtener el texto de la publicación (Caption)
                const messageDiv = article.querySelector('div[data-ad-preview="message"]') || 
                                 article.querySelector('[dir="auto"]') ||
                                 article.querySelector('.x11i5rnm.xat24cr.x1mh8g0r');
                const caption = messageDiv ? messageDiv.innerText : "";
                
                // Filtros de limpieza para evitar contenido no relevante
                const blackList = ["iniciar sesión", "crear cuenta", "olvidado la cuenta", "seguidores", "seguidos", "ver más", "videos"];
                if (caption.length < 20 || blackList.some(word => caption.toLowerCase().includes(word))) continue;
                
                // Evitar duplicados basándose en los primeros caracteres
                if (results.some(r => r.caption.substring(0, 40) === caption.substring(0, 40))) continue;

                // 2. Obtener la fecha
                const dateElement = article.querySelector('h3 a[role="link"] span') || 
                                  article.querySelector('span[id*="jsc_c"]') ||
                                  article.querySelector('a span[dir="auto"]') ||
                                  article.querySelector('time');
                const date = dateElement ? dateElement.innerText : "Reciente";
                
                // 3. Obtener la URL de la publicación
                const linkElement = article.querySelector('h3 a[role="link"]') || 
                                  article.querySelector('a[href*="/posts/"]') ||
                                  article.querySelector('a[href*="permalink"]');
                let url = linkElement ? linkElement.href.split('?')[0] : "https://www.facebook.com/autolock";
                if (url.startsWith('/')) url = 'https://www.facebook.com' + url;
                
                // 4. Obtener la imagen principal
                const imgElements = Array.from(article.querySelectorAll('img'));
                // Identificar la imagen que no sea un icono (normalmente la de mayor tamaño)
                const mainImg = imgElements.find(img => {
                    const src = img.src;
                    const rect = img.getBoundingClientRect();
                    return src.includes('scontent') && rect.width > 200;
                }) || imgElements.find(img => img.src.includes('scontent'));

                const image = mainImg ? mainImg.src : null;

                results.push({
                    date,
                    caption,
                    url,
                    image
                });
                
                if (results.length >= 4) break; 
            }
            return results;
        });

        console.log(`Capturados ${posts.length} posts reales`);

        const cleanedPosts = posts.map((p, idx) => ({
            ...p,
            id: idx + 1,
            // Imagen de respaldo en caso de que el scraping de la imagen falle
            image: p.image || [
                '/images/news/fb_post_1.png',
                '/images/news/fb_post_2.png',
                '/images/news/fb_post_3.png',
                '/images/news/fb_post_4.png'
            ][idx] || '/images/picture-1200.png'
        }));

        const dir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cleanedPosts, null, 2));
        console.log(`Guardados ${cleanedPosts.length} posts actualizados en ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error durante el scraping:', error);
    } finally {
        await browser.close();
    }
};

scrapeFacebook();

