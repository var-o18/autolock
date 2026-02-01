import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
    es: {
        nav: {
            home: "Inicio",
            about: "Sobre Nosotros",
            services: "Servicios",
            tpms: "TPMS",
            ecu: "ECU Remap",
            contact: "Contacto",
            call: "Llamar"
        },
        hero: {
            subtitle: "Servicio Móvil Premium",
            title: "Soluciones para Llaves y Electrónica del Automóvil",
            desc: "¿Perdiste tus llaves? ¿Necesitas una copia? Servicio rápido y profesional en toda la Costa Blanca. Vamos a tu ubicación.",
            call: "Llamar Ahora",
            whatsapp: "WhatsApp",
            badges: ["Sin Daños", "Garantizado", "Desde 2015"]
        },
        services: {
            title: "Nuestros Servicios",
            subtitle: "Especialistas en electrónica y cerrajería de automoción",
            items: {
                lostKeys: { title: "Llaves Perdidas", desc: "¿Perdiste todas tus llaves? Apertura sin daños y llaves nuevas en el acto." },
                programming: { title: "Programación", desc: "Codificación de mandos y transponders para obtener llaves 100% funcionales." },
                repair: { title: "Reparación", desc: "Cambiamos carcasas, botones y baterías. ¡No compres uno nuevo!" },
                lockout: { title: "Apertura Vehículos", desc: "Apertura técnica sin roturas si te dejaste las llaves dentro." },
                ecu: { title: "ECU Remapping", desc: "Más potencia y mejor consumo para tu motor con una reprogramación profesional." },
                tpms: { title: "TPMS", desc: "Diagnóstico, reparación y clonación de sensores de presión de neumáticos." }
            },
            btn: "Detalles"
        },
        steps: {
            title: "Cómo Trabajamos",
            s1: { title: "Contáctanos", desc: "Llámanos o escribe por WhatsApp con tu modelo y año." },
            s2: { title: "Vamos a ti", desc: "Nuestro taller móvil se desplaza a tu ubicación en Costa Blanca." },
            s3: { title: "Solucionado", desc: "Trabajo in-situ, prueba de funcionamiento y pago tras satisfacción." }
        },
        coverage: {
            title: "Zona de Cobertura",
            desc: "Operamos principalmente en la Costa Blanca Norte y Sur."
        },
        gallery: {
            title: "Trabajos Recientes",
            desc: "Algunos de los vehículos y llaves que hemos recuperado."
        },
        faq: {
            title: "Preguntas Frecuentes",
            q1: "¿Cuánto tardan en llegar?",
            a1: "Entre 30-60 minutos para urgencias, dependiendo de la ubicación.",
            q2: "¿Necesito el código del coche?",
            a2: "No siempre. Tenemos herramientas para extraerlo en la mayoría de casos.",
            q3: "¿Es más barato que el concesionario?",
            a3: "Sí, y además vamos a tu ubicación, ahorrándote la grúa.",
            q4: "¿Ofrecéis garantía?",
            a4: "Sí, todas nuestras llaves y trabajos tienen garantía."
        },
        cta: {
            title: "¿Necesitas ayuda urgente?",
            desc: "No te quedes tirado. Llámanos ahora mismo.",
            btn: "Llamar Ahora"
        },
        contact: {
            title: "Contacto",
            subtitle: "Estamos aquí para ayudarte. Rellena el formulario o pide una llamada.",
            form1: {
                title: "CONTÁCTANOS",
                desc: "La forma más fácil de contactarnos. Siempre nos alegra saber de ti.",
                firstName: "Nombre *",
                lastName: "Apellidos *",
                email: "Email *",
                phone: "Teléfono",
                message: "Mensaje",
                submit: "Enviar"
            },
            form2: {
                title: "TE LLAMAMOS",
                desc: "Estaremos encantados de devolverte la llamada.",
                date: "Fecha preferida",
                timeFrom: "Hora desde",
                timeTo: "Hora hasta",
                subject: "Asunto",
                submit: "Pedir Llamada"
            }
        },
        about: {
            title: "Sobre Nosotros",
            p1: "Desde 2015, ofrecemos servicios locales, profesionales y asequibles de automoción para todo tipo de emergencias o problemas, cubriendo todas las marcas y modelos.",
            p2: "Ya sea una llave de repuesto o que no puedas entrar en tu coche, no hay necesidad de entrar en pánico. Estaremos allí para solucionar tus necesidades rápidamente.",
            p3: "Estamos listos para atender cualquier necesidad de llaves de coche en cualquier momento. Podemos ocuparnos de todas las consultas sobre reparación de cerraduras, corte de llaves y codificación de transponders.",
            p4: "Valoramos mucho tu satisfacción y siempre nos centramos en el servicio al cliente, asegurándonos de ofrecer un trato fiable y amable."
        },
        tpms: {
            title: "Servicio TPMS",
            subtitle: "PODEMOS DIAGNOSTICAR Y REPARAR EL FALLO DE TU SISTEMA TPMS",
            intro: "Probablemente te ha pasado. Conduciendo, de repente el cuadro muestra un mensaje de 'Fallo Sensor Presión Neumáticos'. ¿Qué significa y cómo se arregla?",
            section1: {
                title: "¿Cómo se ve el mensaje de fallo?",
                text: "Cuando un sensor detecta un problema con la presión, envía una señal al ordenador del coche, que ilumina una luz en el cuadro. Generalmente es amarilla y parece un signo de exclamación (!) dentro de una 'U'."
            },
            section2: {
                title: "¿Puedo seguir conduciendo?",
                text: "Conducir con una rueda desinflada puede causar que el vehículo tire hacia un lado, lo cual es peligroso. También puede dañar la integridad estructural del neumático. Si has confirmado que la presión es correcta, entonces el sensor simplemente ha fallado y debe ser reemplazado."
            },
            cta: "Llámanos ahora al 685 988 375 o rellena el Formulario de Contacto"
        },
        ecuPage: {
            title: "ECU Remapping",
            intro: "El remapeo cambia la configuración predeterminada del fabricante en la ECU, reemplazándola con nuevo software personalizado según las especificaciones del propietario (dentro de los límites legales).",
            listTitle: "SERVICIOS INCLUIDOS",
            services: [
                "Anulación EGR, DPF, AD BLUE",
                "Clonación de ECU",
                "Eliminación de Inmovilizador",
                "Programación de ECU",
                "Eliminación de Limitadores de Velocidad",
                "Anulación Start/Stop y Arranque en Caliente"
            ],
            disclaimer: "*AVISO: La anulación de sistemas anticontaminación como DPF/EGR/AdBlue está sujeta a legislación. Verifica la normativa vigente."
        },
        servicesPage: {
            title: "Nuestros Servicios",
            list: [
                { title: "Llaves Perdidas", desc: "Si has perdido tus llaves o te las han robado, nuestro equipo de confianza reemplazará tus mandos donde estés. Cortamos las llaves en el acto mientras esperas." },
                { title: "Reparación de Llaves", desc: "¿Llave dañada? ¿Botones rotos? Podemos extraer espadines rotos sin daños y renovar la mayoría de llaves actuales, ahorrándote el coste de una nueva." },
                { title: "Reprogramación", desc: "Usamos la última tecnología para programar llaves, chips y mandos. La mayoría necesitan programación para funcionar con el inmovilizador." },
                { title: "Llaves dentro del coche", desc: "Si dejaste las llaves dentro y no tienes copia, somos expertos en apertura técnica (ganzuado) sin causar ningún daño al vehículo." },
                { title: "Reparación de Cerraduras", desc: "Podemos ayudar con cualquier mecanismo de cerradura dañado, bloqueado o si la llave no gira en el contacto." }
            ]
        }
    },
    en: {
        nav: {
            home: "Home",
            services: "Services",
            tpms: "TPMS",
            ecu: "ECU Remap",
            contact: "Contact",
            about: "About Us",
            call: "Call Now"
        },
        hero: {
            subtitle: "Premium Mobile Service",
            title: "Car Key & Automotive Electronics Solutions",
            desc: "Lost your keys? Need a spare? Fast and professional mobile service in Costa Blanca. We come to you.",
            call: "Call Now",
            whatsapp: "WhatsApp",
            badges: ["No Damage", "Guaranteed", "Since 2015"]
        },
        services: {
            title: "Our Services",
            subtitle: "Specialists in automotive locksmithing and electronics",
            items: {
                lostKeys: { title: "Lost Keys", desc: "Lost all keys? Non-destructive opening and new keys made on the spot." },
                programming: { title: "Key Programming", desc: "Coding remotes and transponders for fully functional keys." },
                repair: { title: "Key Repair", desc: "We replace shells, buttons, and batteries. Don't buy a new one!" },
                lockout: { title: "Vehicle Entry", desc: "Technical opening without damage if you locked your keys inside." },
                ecu: { title: "ECU Remapping", desc: "More power and better fuel economy with professional remapping." },
                tpms: { title: "TPMS", desc: "Diagnosis, repair, and cloning of tyre pressure sensors." }
            },
            btn: "Details"
        },
        steps: {
            title: "How We Work",
            s1: { title: "Contact Us", desc: "Call or WhatsApp us with your car model and year." },
            s2: { title: "We Come to You", desc: "Our mobile workshop travels to your location in Costa Blanca." },
            s3: { title: "Solved", desc: "On-site work, full testing, and payment upon satisfaction." }
        },
        coverage: {
            title: "Coverage Area",
            desc: "We operate mainly in Costa Blanca North and South."
        },
        gallery: {
            title: "Recent Work",
            desc: "Some of the vehicles and keys we have restored."
        },
        faq: {
            title: "Frequently Asked Questions",
            q1: "How long to arrive?",
            a1: "Between 30-60 minutes for emergencies, depending on location.",
            q2: "Do I need the key code?",
            a2: "Not always. We have tools to extract it in most cases.",
            q3: "Is it cheaper than the dealer?",
            a3: "Yes, significantly. And we save you the towing cost by coming to you.",
            q4: "Do you offer warranty?",
            a4: "Yes, all our keys and work come with warranty."
        },
        cta: {
            title: "Need Urgent Help?",
            desc: "Don't get stranded. Call us right now.",
            btn: "Call Now"
        },
        contact: {
            title: "Contact Us",
            subtitle: "We look forward to hearing from you.",
            form1: {
                title: "GET IN TOUCH",
                desc: "The easiest way to get in touch with us is by using this form. We are always glad to hear from you!",
                firstName: "First name *",
                lastName: "Last name *",
                email: "Email *",
                phone: "Phone",
                message: "Message",
                submit: "Submit"
            },
            form2: {
                title: "CALLBACK SERVICES",
                desc: "We will be happy to call you back!",
                date: "Preferred callback date",
                timeFrom: "Time from",
                timeTo: "Time to",
                subject: "Subject of your inquiry *",
                submit: "Submit"
            }
        },
        about: {
            title: "About Us",
            p1: "Since 2015, we've been offering a local, professional and affordable automotive services for every type of emergency or problem, covering all makes, all models and vehicles.",
            p2: "Whether it's for a replacement / spare key or you are unable to enter your car because you need your fob programmed, there's no need to panic. We'll be there to provide for your needs fast.",
            p3: "We are ready to look after your car key replacement needs at any time. We can look after all enquiries you have about lock refurbishment, key cutting and transponder encoding.",
            p4: "We value your satisfaction highly and always focus on customer service, making sure we offer a reliable and friendly service."
        },
        tpms: {
            title: "TPMS SERVICE",
            subtitle: "WE CAN DIAGNOSE AND REPAIR THE FAULT WITH YOUR TPMS SYSTEM",
            intro: "You've probably been there before. While driving, your instrument cluster suddenly displays a 'Tyre Pressure Sensor Fault' message or warning light. But what exactly does it mean and how do you fix it?",
            section1: {
                title: "What Does a Tyre Pressure Sensor Fault Message Look Like?",
                text: "When a tyre pressure sensor detects a problem with tire pressure, it will send a signal to the car's computer, which will then illuminate a light on the dash. This light is generally bright yellow, and looks like an exclamation point (!), inside of a 'U' shaped symbol."
            },
            section2: {
                title: "Can I Still Drive My Car?",
                text: "Driving on an under-inflated tyre can cause the vehicle to pull in one direction or the other, depending on which tire is low. This will cause the driver to have poor control over the vehicle. If you've confirmed that the tire pressure is adequate, then the sensor has simply failed."
            },
            cta: "Give us a call now on 685988375 or fill out the Contact Form"
        },
        ecuPage: {
            title: "ECU Remapping",
            intro: "Remapping a car changes the manufacturer's default settings and software on the ECU, replacing it with new software which can be tweaked and customised to the owner's specifications (within legal limitations).",
            listTitle: "SERVICES INCLUDE",
            services: [
                "EGR, DPF, AD BLUE DELETE*",
                "ECU CLONING",
                "IMMOBILISER REMOVAL",
                "ECU PROGRAMMING",
                "SPEED LIMITERS REMOVED",
                "STOP/START, HOT START DELETE"
            ],
            disclaimer: "*DISCLAIMER: Please be aware DPF/EGR/AdBlue removal is subject to laws. Please check local regulations."
        },
        servicesPage: {
            title: "Our Services",
            list: [
                { title: "Lost Car Keys", desc: "If you've lost your keys or had them stolen and need replacements, have our trusted team replace your electronic fobs wherever you are. We cut keys while you wait." },
                { title: "Car Key Repair", desc: "Is your key damaged? Has it snapped in the ignition? Our professionals are able to extract key shafts without causing damage. We can refurbish or replace the majority of keys used today." },
                { title: "Car Key Reprogramming", desc: "Our professionals use the latest technology when programming car keys, transponder chips, key less fobs and remotes. Most keys need programming to work with the immobiliser to allow the car to start." },
                { title: "Locked Keys in Car", desc: "If you have accidentally locked your keys in your car and don't have a duplicate then don't worry. We are experts at vehicle lock picking and gaining entry without damage." },
                { title: "Lock Repairs", desc: "Our Auto Locksmith can help with any Car Lock mechanism problems such as damaged and broken car lock, if the lock is jammed and won't open or car key is jammed in ignition." }
            ]
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es'); // Default Spanish

    const toggleLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: toggleLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
