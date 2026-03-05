import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPE_SCRIPT = path.join(__dirname, 'scrape-fb.js');

// Configuración del Horario: Ejecutar todos los días a las 9:00 AM
const SCHEDULE_DAYS = [0, 1, 2, 3, 4, 5, 6]; // Todos los días
const SCHEDULE_HOUR = 9;
const SCHEDULE_MINUTE = 0;

/**
 * Ejecuta el script de scraping.
 */
const runScraper = () => {
    console.log(`\n[${new Date().toLocaleString()}] Iniciando actualización automática de Facebook...`);

    const scraper = spawn('node', [SCRAPE_SCRIPT], {
        stdio: 'inherit'
    });

    scraper.on('close', (code) => {
        if (code === 0) {
            console.log(`Actualización completada con éxito a las ${new Date().toLocaleString()}`);
        } else {
            console.error(`El proceso falló con código ${code}`);
        }
        scheduleNext();
    });
};

/**
 * Calcula la próxima fecha y hora de ejecución.
 * @returns {Date} La fecha del próximo envío.
 */
const getNextRunTime = () => {
    const now = new Date();
    const nextRun = new Date(now);

    // Configurar para la hora programada de hoy
    nextRun.setHours(SCHEDULE_HOUR, SCHEDULE_MINUTE, 0, 0);

    // Si ya pasó la hora de hoy, pasar al día siguiente
    if (now >= nextRun) {
        nextRun.setDate(nextRun.getDate() + 1);
    }

    // Buscar el siguiente día programado
    while (!SCHEDULE_DAYS.includes(nextRun.getDay())) {
        nextRun.setDate(nextRun.getDate() + 1);
    }

    return nextRun;
};

/**
 * Programa la siguiente ejecución del scraper.
 */
const scheduleNext = () => {
    const nextRun = getNextRunTime();
    const delay = nextRun.getTime() - Date.now();

    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    console.log(`\nPróxima actualización programada para: ${days[nextRun.getDay()]}, ${nextRun.toLocaleString()}`);
    console.log(`   (dentro de ${Math.round(delay / 1000 / 60 / 60)} horas)`);

    setTimeout(runScraper, delay);
};

console.log('Programador de Noticias Autolock activado');
console.log(`Horario: Todos los días a las ${SCHEDULE_HOUR}:${SCHEDULE_MINUTE.toString().padStart(2, '0')}`);

// Ejecutar inmediatamente al arrancar para asegurar datos frescos
console.log('\nEjecutando actualización inicial...');
runScraper();

