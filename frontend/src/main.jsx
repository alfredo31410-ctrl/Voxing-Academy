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
  Plus,
  Save,
  Sparkles,
  Star,
  Users,
  X
} from 'lucide-react';
import { initialCourses, learningPath } from './data/courses';
import './styles.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const benefits = [
  'Ruta clara desde cero hasta comunicación práctica.',
  'Speaking Lab semanal para practicar sin presión.',
  'Cursos cortos para resolver necesidades reales.',
  'Comunidad privada, retos y acompañamiento.',
  'Constancias por curso y certificado final.',
  'Práctica con IA para estudiar entre sesiones.'
];

const faqs = [
  {
    q: '¿Necesito saber inglés para empezar?',
    a: 'No. La ruta inicia desde cero y está pensada para personas que sienten pena, miedo o confusión al hablar.'
  },
  {
    q: '¿La membresía incluye todos los cursos?',
    a: 'Sí. La membresía anual Voxing Plus contempla 12 cursos, Speaking Lab, comunidad y actualizaciones durante el año.'
  },
  {
    q: '¿Puedo tomar solo un curso?',
    a: 'Sí. Los cursos sueltos ayudan a resolver una necesidad puntual como viajes, pronunciación, trabajo o escritura.'
  },
  {
    q: '¿Habrá certificados?',
    a: 'La estructura está preparada para constancias por curso y certificado Voxing al completar la ruta completa.'
  }
];

const testimonials = [
  {
    quote: 'Sección lista para testimonios reales de alumnos Voxing.',
    name: 'Próximamente',
    role: 'Historias de avance'
  },
  {
    quote: 'Aquí podremos integrar videos, reseñas y capturas cuando estén disponibles.',
    name: 'Voxing Academy',
    role: 'Comunidad'
  }
];

function App() {
  const [adminMode, setAdminMode] = useState(window.location.pathname.startsWith('/admin'));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPop = () => setAdminMode(window.location.pathname.startsWith('/admin'));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const goAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setAdminMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    window.history.pushState({}, '', '/');
    setAdminMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (adminMode) {
    return <AdminPanel onGoHome={goHome} />;
  }

  return (
    <div className="site-shell">
      <Header onAdmin={goAdmin} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
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
    ['Sobre Voxing', '#sobre'],
    ['Programas', '#programas'],
    ['Metodología', '#metodologia'],
    ['FAQ', '#faq'],
    ['Contacto', '#contacto']
  ];

  return (
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Voxing Academy inicio">
        <img src="/images/voxing-logo-cropped.png" alt="Voxing Academy" />
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
        <a className="primary-button nav-cta" href="#contacto">
          Pedir informes
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
        <p className="eyebrow">English that sounds like you</p>
        <h1>Aprende inglés con una ruta clara para hablar con más seguridad.</h1>
        <p className="hero-lede">
          Voxing Academy acompaña tu avance desde tu nivel actual hasta usar inglés en trabajo, viajes,
          estudio y vida diaria con práctica real, sesiones en vivo y una metodología humana.
        </p>
        <div className="hero-actions">
          <a className="primary-button large" href="#contacto">
            Quiero empezar
            <ArrowRight size={18} />
          </a>
          <a className="secondary-button large" href="#programas">
            Ver programas
          </a>
        </div>
        <div className="trust-row" aria-label="Beneficios principales">
          <span><Mic size={16} /> Speaking Lab</span>
          <span><GraduationCap size={16} /> Certificado final</span>
          <span><Sparkles size={16} /> Práctica con IA</span>
        </div>
      </div>
      <div className="hero-media" aria-label="Alumnos practicando inglés">
        <img src="/images/voxing-hero.png" alt="Grupo de estudiantes practicando conversación en inglés" />
        <div className="hero-stat">
          <strong>12 cursos</strong>
          <span>de cero a confianza</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section split" id="sobre">
      <div>
        <p className="section-kicker">Sobre Voxing Academy</p>
        <h2>Una academia para avanzar sin pena, sin presión y sin estudiar a ciegas.</h2>
      </div>
      <div className="rich-copy">
        <p>
          Voxing Academy no enseña inglés como una lista interminable de reglas. Su propuesta es una ruta
          progresiva y visual donde cada alumno entiende qué practicar, cómo medir su avance y cómo usar el
          idioma en situaciones reales.
        </p>
        <p>
          La marca combina cursos grabados, práctica en vivo, comunidad y herramientas modernas para que el
          aprendizaje se sienta acompañado, flexible y aplicable.
        </p>
      </div>
    </section>
  );
}

function Programs() {
  const featured = initialCourses.slice(0, 6);

  return (
    <section className="section" id="programas">
      <div className="section-heading">
        <p className="section-kicker">Programas y cursos</p>
        <h2>El ecosistema Voxing está diseñado para necesidades reales.</h2>
        <p>
          Empieza con una clase gratuita, toma un curso puntual o avanza con la membresía completa Voxing Plus.
        </p>
      </div>

      <div className="offer-band">
        <div>
          <span className="pill">Membresía principal</span>
          <h3>Voxing Plus: English From Zero to Confident</h3>
          <p>
            12 cursos, Speaking Lab semanal, comunidad privada, actualizaciones, constancias y certificado final.
          </p>
        </div>
        <div className="price-block">
          <span>Precio sugerido</span>
          <strong>$3,487 MXN</strong>
          <small>Curso suelto: $497 MXN</small>
        </div>
      </div>

      <div className="course-grid">
        {featured.map((course) => (
          <article className="course-card" key={course.slug}>
            <div className="course-icon">{iconFor(course.slug)}</div>
            <span>{course.phase}</span>
            <h3>{course.title}</h3>
            <p>{course.transformation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section className="section method-section" id="metodologia">
      <div className="section-heading">
        <p className="section-kicker">Metodología</p>
        <h2>Una ruta por fases para convertir estudio en comunicación.</h2>
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
        <h2>Aprender con Voxing se siente claro, útil y acompañado.</h2>
      </div>
      <div className="benefit-grid">
        {benefits.map((benefit) => (
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
    <section className="section" aria-label="Testimonios">
      <div className="section-heading">
        <p className="section-kicker">Testimonios</p>
        <h2>Historias de avance listas para integrarse.</h2>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <figure className="testimonial-card" key={item.name}>
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </figcaption>
          </figure>
        ))}
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
        <h2>Empieza con una ruta que sí puedas seguir.</h2>
        <p>
          La web queda preparada para integrar WhatsApp, formularios, campañas, pagos y landings específicas.
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
          ¿Qué quieres lograr?
          <textarea placeholder="Quiero aprender inglés para..." />
        </label>
        <button className="primary-button large" type="button">
          Solicitar informes
          <MessageCircle size={18} />
        </button>
      </form>
    </section>
  );
}

function Footer({ onAdmin }) {
  return (
    <footer className="footer">
      <img src="/images/voxing-logo-cropped.png" alt="Voxing Academy" />
      <p>Voxing Academy. English that sounds like you.</p>
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
      fetchCourses(token).then(setCourses).catch(() => setStatus('No se pudieron cargar cursos.'));
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
      if (!response.ok) throw new Error('Credenciales inválidas');
      const data = await response.json();
      localStorage.setItem('voxing-token', data.token);
      setToken(data.token);
      setStatus('Acceso validado correctamente.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function saveCourse(event) {
    event.preventDefault();
    setStatus('Guardando curso...');
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
  }

  async function removeCourse(id) {
    await fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setCourses(await fetchCourses(token));
    setStatus('Curso eliminado.');
  }

  if (!token) {
    return (
      <main className="admin-shell">
        <section className="login-panel">
          <img src="/images/voxing-logo-cropped.png" alt="Voxing Academy" />
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
        <img src="/images/voxing-logo-cropped.png" alt="Voxing Academy" />
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
