import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  GraduationCap,
  Headphones,
  Laptop,
  Lock,
  Menu,
  MessageCircle,
  Mic,
  PenLine,
  Plane,
  Play,
  Plus,
  Save,
  Star,
  Users,
  X
} from 'lucide-react';
import { initialCourses, learningPath } from './data/courses';
import FreeClassLanding from './landing/FreeClassLanding';
import AdminAccessGate from './components/AdminAccessGate';
import './styles.css';

const API_URL = '/api';
const leadHref = '/clase-gratis';

function formatApiError(error, fallback = 'No se pudo conectar con el servidor.') {
  if (error instanceof TypeError) {
    return 'No se pudo conectar con la API local. Revisa que el backend esté corriendo en http://127.0.0.1:4000.';
  }

  return error.message || fallback;
}

const microLessons = [
  {
    tag: 'Frase base',
    title: 'I am learning English.',
    detail: 'Estoy aprendiendo inglés.',
    note: 'Una primera frase útil para empezar sin miedo.'
  },
  {
    tag: 'Error común',
    title: "I'm hungry.",
    detail: 'No digas: I have hunger.',
    note: 'Aprende frases completas, no traducciones palabra por palabra.'
  },
  {
    tag: 'Travel English',
    title: 'Where is the bathroom?',
    detail: '¿Dónde está el baño?',
    note: 'Inglés práctico para resolver situaciones reales.'
  }
];

const wordBank = ['Hello', 'Please', 'Thanks', 'Help', 'Water', 'Work', 'Today', 'Good'];

const ecosystemBenefits = [
  'Ruta visible de 6 fases para no sentir que estudias sin rumbo.',
  '12 cursos que conectan pronunciacion, listening, gramatica, conversacion y aplicacion real.',
  'Speaking Lab semanal para practicar en vivo, resolver dudas y corregir pronunciacion.',
  'Comunidad privada con retos, audios, frases y seguimiento para no abandonar.',
  'Constancia por curso y certificado final al completar la ruta Voxing.',
  'Puedes empezar con una clase gratis, tomar un curso suelto o avanzar con la membresia anual.'
];

const productLadder = [
  {
    step: 'Entrada',
    title: 'Clase gratuita por tema',
    detail: 'Captamos tu objetivo, revisamos tu nivel y te mostramos por donde empezar sin presion.',
    price: 'Gratis'
  },
  {
    step: 'Venta inmediata',
    title: 'Curso suelto Voxing',
    detail: 'Para resolver una necesidad puntual: pronunciacion, viaje, trabajo, gramatica o conversacion.',
    price: '$497 MXN'
  },
  {
    step: 'Ruta completa',
    title: 'Voxing Plus anual',
    detail: 'La membresia completa con 12 cursos, Speaking Lab, comunidad, actualizaciones y certificado final.',
    price: '$3,487 MXN'
  }
];

const membershipIncludes = [
  '12 cursos ordenados de English Starter a Fluency Lab.',
  'Speaking Lab semanal en vivo con role plays, dudas y correccion.',
  'Actualizaciones durante el ano: retos, capsulas, frases y practica con IA.',
  'Comunidad privada con avisos, audios, retos de 7 dias y motivacion.',
  'Constancias por curso completado y certificado Voxing de Ingles Practico.',
  'Bonos sugeridos: pack de frases esenciales y kit de practica de 30 dias.'
];

const faqs = [
  {
    q: '¿Necesito saber inglés para empezar?',
    a: 'No. Voxing está diseñado para principiantes que quieren perder la pena y construir confianza paso a paso.'
  },
  {
    q: '¿Puedo tomar solo un curso?',
    a: 'Sí. Puedes tomar cursos puntuales o avanzar con Voxing Plus, la ruta completa anual.'
  },
  {
    q: '¿Qué hace diferente a Voxing?',
    a: 'La metodología parte de frases reales, práctica guiada, micro-contenido, speaking y situaciones de vida diaria.'
  },
  {
    q: '¿El panel ya permite administrar cursos?',
    a: 'Sí. El admin permite crear, editar y eliminar cursos conectados a MongoDB Atlas.'
  }
];

function App() {
  const [routePath, setRoutePath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const adminMode = routePath.startsWith('/admin');
  const landingMode = routePath.startsWith('/clase-gratis');

  useEffect(() => {
    const onPop = () => setRoutePath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const goAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setRoutePath('/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    window.history.pushState({}, '', '/');
    setRoutePath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (adminMode) {
    return (
      <AdminAccessGate>
        <AdminPanel onGoHome={goHome} />
      </AdminAccessGate>
    );
  }

  if (landingMode) {
    return <FreeClassLanding onGoHome={goHome} />;
  }

  return (
    <div className="site-shell">
      <Header onAdmin={goAdmin} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <BrandIntro />
        <MicroLearning />
        <FreeClass />
        <ProductLadder />
        <Programs />
        <Methodology />
        <Benefits />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer onAdmin={goAdmin} />
    </div>
  );
}

function Header({ onAdmin, menuOpen, setMenuOpen }) {
  const links = [
    ['Inicio', '#inicio'],
    ['Método', '#metodo'],
    ['Programas', '#programas'],
    ['Ruta', '#ruta'],
    ['FAQ', '#faq'],
    ['Contacto', '#contacto']
  ];

  return (
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Voxing Academy inicio">
        <img src="/brand/voxing-logo-color.png" alt="Voxing Academy" />
      </a>
      <button className="icon-button mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Navegación principal">
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <button className="ghost-button" onClick={onAdmin}>
          <Lock size={16} />
          Admin
        </button>
        <a className="primary-button nav-cta" href="#clase-gratis">
          Clase gratis
          <ArrowRight size={17} />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <img className="hero-logo" src="/brand/voxing-logo-color.png" alt="Voxing Academy" />
        <p className="eyebrow">English that sounds like you</p>
        <h1>Inglés práctico para hablar con confianza desde tu vida real.</h1>
        <p className="hero-lede">
          Voxing Academy convierte el inglés en práctica clara: frases útiles, speaking guiado,
          micro-lecciones, retos y una ruta para avanzar sin pena.
        </p>
        <div className="hero-actions">
          <a className="primary-button large" href={leadHref}>
            Agendar clase gratis
            <ArrowRight size={18} />
          </a>
          <a className="secondary-button large" href="#metodo">
            Ver método
            <Play size={17} />
          </a>
        </div>
        <div className="trust-row" aria-label="Beneficios principales">
          <span><Mic size={16} /> Speaking Lab</span>
          <span><BookOpenCheck size={16} /> Frases reales</span>
          <span><GraduationCap size={16} /> Ruta completa</span>
        </div>
      </div>
      <div className="hero-board" aria-label="Micro lecciones Voxing">
        <div className="lesson-phone">
          <div className="phone-top">
            <span></span>
            <strong>Daily English</strong>
          </div>
          <div className="lesson-bubble main">
            <small>Today&apos;s phrase</small>
            <strong>I need help, please.</strong>
            <span>Necesito ayuda, por favor.</span>
          </div>
          <div className="lesson-bubble">
            <small>Mini challenge</small>
            <strong>I am a student.</strong>
            <span>Correct answer: B</span>
          </div>
          <div className="audio-row">
            <Mic size={18} />
            <div>
              <strong>Repeat out loud</strong>
              <span>3 times today</span>
            </div>
          </div>
        </div>
        <div className="floating-word">Hello</div>
        <div className="floating-card">
          <strong>20 palabras base</strong>
          <span>5 al día. Sin correr. Solo empezar.</span>
        </div>
      </div>
    </section>
  );
}

function BrandIntro() {
  return (
    <section className="brand-section" id="metodo">
      <div className="brand-mark">
        <img src="/brand/voxing-logo-white.png" alt="Voxing Academy" />
      </div>
      <div>
        <p className="section-kicker">Nueva identidad Voxing</p>
        <h2>Una academia con voz propia: cercana, clara y enfocada en comunicación.</h2>
      </div>
      <div className="rich-copy light">
        <p>
          La marca gira alrededor de conversación: el globo de diálogo, los puntos de habla y el contraste
          navy/teal. La experiencia del sitio ahora refleja esa personalidad: directa, visual y fácil de seguir.
        </p>
      </div>
    </section>
  );
}

function MicroLearning() {
  return (
    <section className="section micro-section">
      <div className="section-heading">
        <p className="section-kicker">Contenido que enseña</p>
        <h2>Micro-lecciones para que el inglés se vuelva parte de tu día.</h2>
      </div>
      <div className="micro-grid">
        {microLessons.map((lesson) => (
          <article className="micro-card" key={lesson.title}>
            <span>{lesson.tag}</span>
            <h3>{lesson.title}</h3>
            <p>{lesson.detail}</p>
            <small>{lesson.note}</small>
          </article>
        ))}
      </div>
      <div className="word-bank" aria-label="Palabras básicas">
        {wordBank.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </div>
    </section>
  );
}

function FreeClass() {
  return (
    <section className="free-class-section" id="clase-gratis">
      <div className="free-class-grid">
        <div>
          <p className="section-kicker">Primer paso</p>
          <h2>Agenda una clase gratis y descubre desde dónde empezar.</h2>
          <p>
            Voxing no te mete a una ruta genérica. Primero entendemos tu nivel, tu objetivo y la razón por la que
            quieres hablar inglés con más seguridad.
          </p>
          <div className="free-class-actions">
            <a className="primary-button large" href={leadHref}>
              Quiero mi clase gratis
              <MessageCircle size={18} />
            </a>
            <span>Diagnóstico inicial, recomendación de ruta y próximos pasos.</span>
          </div>
        </div>
        <div className="free-class-panel" aria-label="Qué incluye la clase gratis">
          <strong>Tu sesión inicial incluye</strong>
          <ul>
            <li><Check size={16} /> Revisión rápida de nivel y confianza al hablar.</li>
            <li><Check size={16} /> Objetivo principal: estudio, trabajo, viaje o crecimiento profesional.</li>
            <li><Check size={16} /> Recomendación del programa ideal dentro del ecosistema Voxing.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProductLadder() {
  return (
    <section className="section ladder-section" aria-label="Estrategia de entrada Voxing">
      <div className="section-heading">
        <p className="section-kicker">Ecosistema Voxing</p>
        <h2>Una ruta simple: clase gratis, curso suelto y membresia anual.</h2>
        <p>
          El ecosistema esta pensado para que una persona pueda entrar sin presion, resolver una necesidad puntual
          y despues avanzar con una ruta completa de ingles practico.
        </p>
      </div>
      <div className="ladder-grid">
        {productLadder.map((item, index) => (
          <article className="ladder-card" key={item.title}>
            <span>{index + 1}</span>
            <small>{item.step}</small>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
            <strong>{item.price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section className="section" id="programas">
      <div className="section-heading">
        <p className="section-kicker">Programas</p>
        <h2>De frases simples a conversaciones reales.</h2>
        <p>
          El ecosistema Voxing se organiza en cursos puntuales y una ruta completa para avanzar todo el año.
        </p>
      </div>

      <div className="offer-band">
        <div>
          <span className="pill">Membresía principal</span>
          <h3>Voxing Plus: English From Zero to Confident</h3>
          <p>
            12 cursos, Speaking Lab semanal, comunidad privada, actualizaciones, constancias y certificado final.
          </p>
          <div className="membership-list">
            {membershipIncludes.slice(0, 3).map((item) => (
              <span key={item}><Check size={15} /> {item}</span>
            ))}
          </div>
        </div>
        <div className="price-block">
          <span>Precio sugerido</span>
          <strong>$3,487 MXN</strong>
          <small>Curso suelto: $497 MXN</small>
        </div>
      </div>

      <div className="membership-grid">
        {membershipIncludes.slice(3).map((item) => (
          <div className="membership-item" key={item}>
            <Check size={16} />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="course-grid">
        {initialCourses.map((course) => {
          const category = categoryFor(course.slug);
          return (
            <article className="course-card" key={course.slug}>
              <div className="course-topline">
                <div className="course-icon">{iconFor(course.slug)}</div>
                <div className="course-tags">
                  <span>{course.phase}</span>
                  <strong>{category}</strong>
                </div>
              </div>
              <h3>{course.title}</h3>
              <div className="course-fit">
                <small>Ideal para</small>
                <p>{course.audience}</p>
              </div>
              <div className="course-result">
                <small>Transformacion</small>
                <p>{course.transformation}</p>
              </div>
              <div className="course-meta">
                <span>{course.price}</span>
                <small>Curso suelto + Speaking Lab</small>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section className="section path-section" id="ruta">
      <div className="section-heading">
        <p className="section-kicker">Ruta Voxing</p>
        <h2>Aprende en fases visibles, no en una biblioteca desordenada.</h2>
      </div>
      <div className="path-grid">
        {learningPath.map((step, index) => (
          <article className="path-item" key={step.title}>
            <div className="path-number">{index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <ul>
              {step.courses.map((course) => (
                <li key={course}>
                  <Check size={15} />
                  {course}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section benefits-section">
      <div className="section-heading">
        <p className="section-kicker">Beneficios</p>
        <h2>Un sistema de aprendizaje amable, repetible y accionable.</h2>
      </div>
      <div className="benefit-grid">
        {ecosystemBenefits.map((benefit) => (
          <div className="benefit-item" key={benefit}>
            <Star size={18} />
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section proof-section" aria-label="Testimonios">
      <div className="section-heading">
        <p className="section-kicker">Historias</p>
        <h2>Espacio listo para testimonios, videos y avances reales.</h2>
      </div>
      <div className="proof-grid">
        <figure className="proof-card">
          <blockquote>“Antes me daba pena hablar. Ahora practico frases cortas todos los días.”</blockquote>
          <figcaption>Alumno Voxing · Próximamente</figcaption>
        </figure>
        <figure className="proof-card dark">
          <blockquote>“No necesitas hablar perfecto para empezar. Necesitas una ruta clara.”</blockquote>
          <figcaption>Voxing Academy</figcaption>
        </figure>
        <figure className="proof-card">
          <blockquote>“Quiero inglés para trabajar, viajar y responder sin quedarme en blanco.”</blockquote>
          <figcaption>Perfil de alumno ideal · En validación</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq-section" id="faq">
      <div className="section-heading">
        <p className="section-kicker">Preguntas frecuentes</p>
        <h2>Lo esencial antes de iniciar.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <button className="faq-item" key={item.q} onClick={() => setOpen(open === index ? -1 : index)}>
            <span>
              <strong>{item.q}</strong>
              {open === index && <p>{item.a}</p>}
            </span>
            <ChevronDown className={open === index ? 'rotated' : ''} size={20} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contacto">
      <div>
        <p className="section-kicker">Contacto</p>
        <h2>Empieza con una frase. Avanza con una ruta.</h2>
        <p>
          Cuéntanos tu objetivo y te orientamos con la ruta Voxing adecuada. El botón puede conectarse a WhatsApp
          en producción con la variable VITE_WHATSAPP_URL.
        </p>
      </div>
      <form className="contact-form">
        <label>
          Nombre
          <input placeholder="Tu nombre" />
        </label>
        <label>
          Correo o WhatsApp
          <input placeholder="tu@email.com" />
        </label>
        <label>
          ¿Qué quieres lograr con tu inglés?
          <textarea placeholder="Quiero aprender inglés para..." />
        </label>
        <a className="primary-button large" href={leadHref}>
          Solicitar informes
          <MessageCircle size={18} />
        </a>
      </form>
    </section>
  );
}

function Footer({ onAdmin }) {
  return (
    <footer className="footer">
      <img src="/brand/voxing-logo-color.png" alt="Voxing Academy" />
      <p>English that sounds like you.</p>
      <button className="text-button" onClick={onAdmin}>Administrador</button>
    </footer>
  );
}

function AdminPanel({ onGoHome }) {
  const [token, setToken] = useState(localStorage.getItem('voxing-token') || '');
  const [email, setEmail] = useState('alfredo31410_db_user');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);

  const emptyCourse = useMemo(() => ({
    title: '',
    phase: 'Fase 1',
    audience: '',
    transformation: '',
    price: '$497 MXN',
    format: '4 a 6 horas de contenido grabado + sesión en vivo',
    featured: false
  }), []);

  useEffect(() => {
    if (token) {
      fetchCourses(token).then(setCourses).catch((error) => setStatus(formatApiError(error, 'No se pudieron cargar cursos.')));
    }
  }, [token]);

  async function login(event) {
    event.preventDefault();
    setStatus('Validando acceso...');
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error('Credenciales inválidas.');
      const data = await response.json();
      localStorage.setItem('voxing-token', data.token);
      setToken(data.token);
      setStatus('Acceso validado correctamente.');
    } catch (error) {
      setStatus(formatApiError(error, 'No se pudo validar el acceso.'));
    }
  }

  async function saveCourse(event) {
    event.preventDefault();
    setStatus('Guardando curso...');
    try {
      const method = editing?._id ? 'PUT' : 'POST';
      const url = editing?._id ? `${API_URL}/courses/${editing._id}` : `${API_URL}/courses`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editing)
      });
      if (!response.ok) {
        setStatus('No se pudo guardar el curso.');
        return;
      }
      setCourses(await fetchCourses(token));
      setEditing(null);
      setStatus('Curso guardado.');
    } catch (error) {
      setStatus(formatApiError(error, 'No se pudo guardar el curso.'));
    }
  }

  async function removeCourse(id) {
    try {
      await fetch(`${API_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(await fetchCourses(token));
      setStatus('Curso eliminado.');
    } catch (error) {
      setStatus(formatApiError(error, 'No se pudo eliminar el curso.'));
    }
  }

  if (!token) {
    return (
      <main className="admin-shell">
        <section className="login-panel">
          <img src="/brand/voxing-logo-color.png" alt="Voxing Academy" />
          <h1>Panel de administración</h1>
          <form onSubmit={login}>
            <label>
              Usuario o correo
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Contraseña
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button className="primary-button large" type="submit">
              Entrar
              <Lock size={18} />
            </button>
          </form>
          <p className="admin-status">{status}</p>
          <button className="text-button" onClick={onGoHome}>Volver al sitio</button>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <aside className="admin-sidebar">
        <img src="/brand/voxing-logo-color.png" alt="Voxing Academy" />
        <button className="secondary-button" onClick={() => setEditing(emptyCourse)}>
          <Plus size={16} />
          Nuevo curso
        </button>
        <button className="text-button" onClick={onGoHome}>Ver sitio</button>
        <button
          className="text-button"
          onClick={() => {
            localStorage.removeItem('voxing-token');
            setToken('');
          }}
        >
          Cerrar sesión
        </button>
      </aside>
      <section className="admin-content">
        <div className="admin-heading">
          <div>
            <p className="section-kicker">Administrador</p>
            <h1>Cursos Voxing Academy</h1>
          </div>
          <span>{courses.length} cursos</span>
        </div>
        <p className="admin-status">{status}</p>
        <div className="admin-grid">
          {courses.map((course) => (
            <article className="admin-course" key={course._id}>
              <span>{course.phase}</span>
              <h2>{course.title}</h2>
              <p>{course.transformation}</p>
              <div className="admin-actions">
                <button className="secondary-button" onClick={() => setEditing(course)}>
                  <PenLine size={16} />
                  Editar
                </button>
                <button className="danger-button" onClick={() => removeCourse(course._id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      {editing && (
        <div className="modal-backdrop">
          <form className="course-form" onSubmit={saveCourse}>
            <div className="modal-heading">
              <h2>{editing._id ? 'Editar curso' : 'Nuevo curso'}</h2>
              <button type="button" className="icon-button" onClick={() => setEditing(null)} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>
            {['title', 'phase', 'audience', 'transformation', 'price', 'format'].map((field) => (
              <label key={field}>
                {labelFor(field)}
                <input
                  value={editing[field] || ''}
                  onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                />
              </label>
            ))}
            <button className="primary-button large" type="submit">
              Guardar
              <Save size={18} />
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

async function fetchCourses(token) {
  const response = await fetch(`${API_URL}/courses`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!response.ok) throw new Error('No se pudieron cargar cursos');
  return response.json();
}

function iconFor(slug) {
  const map = {
    'english-starter-desde-cero': <BookOpenCheck size={22} />,
    'pronunciacion-y-listening-basico': <Headphones size={22} />,
    'gramatica-facil-para-hablar': <PenLine size={22} />,
    'vocabulario-de-vida-diaria': <MessageCircle size={22} />,
    'conversacion-con-confianza': <Mic size={22} />,
    'english-for-work': <BriefcaseBusiness size={22} />,
    'travel-english': <Plane size={22} />,
    'english-with-ai-tools': <Laptop size={22} />
  };
  return map[slug] || <Users size={22} />;
}

function categoryFor(slug) {
  const map = {
    'english-starter-desde-cero': 'Inicio',
    'pronunciacion-y-listening-basico': 'Pronunciacion',
    'gramatica-facil-para-hablar': 'Estructura',
    'vocabulario-de-vida-diaria': 'Vida diaria',
    'conversacion-con-confianza': 'Speaking',
    'english-for-work': 'Trabajo',
    'travel-english': 'Viajes',
    'ingles-para-ninos-y-familias': 'Familia',
    'writing-y-correos-en-ingles': 'Writing',
    'preparacion-a1-a2': 'Nivel A1-A2',
    'english-with-ai-tools': 'IA',
    'fluency-lab-proyecto-final': 'Fluidez'
  };
  return map[slug] || 'Curso';
}

function labelFor(field) {
  const labels = {
    title: 'Título',
    phase: 'Fase',
    audience: 'Cliente ideal',
    transformation: 'Transformación',
    price: 'Precio',
    format: 'Formato'
  };
  return labels[field] || field;
}

createRoot(document.getElementById('root')).render(<App />);
