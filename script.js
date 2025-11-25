// Particles Animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Connect nearby particles
    particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // 收件人邮箱（从联系信息中获取）
        const recipientEmail = 'contact@example.com';
        
        // 构建邮件主题
        const subject = encodeURIComponent(`来自 ${name} 的留言`);
        
        // 构建邮件正文
        const body = encodeURIComponent(
            `您好，\n\n` +
            `我的姓名：${name}\n` +
            `我的邮箱：${email}\n\n` +
            `留言内容：\n${message}\n\n` +
            `此致\n敬礼`
        );
        
        // 构建 mailto 链接
        const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        
        // 打开邮件客户端
        window.location.href = mailtoLink;
        
        // 可选：显示提示信息
        setTimeout(() => {
            alert('正在打开邮件客户端...');
        }, 100);
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.mission-card, .timeline-item, .event-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// Event Modal
const eventModal = document.getElementById('eventModal');
const eventLinks = document.querySelectorAll('.event-link');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Event data
const eventData = {
    1: {
        title: '技术分享会',
        location: '线上会议',
        dateDay: '15',
        dateMonth: 'MAR',
        description: '分享最新的技术趋势和开发经验，与同行交流学习。本次技术分享会将深入探讨前端开发、后端架构、云原生技术等热门话题。',
        time: '2024年3月15日 14:00 - 17:00',
        address: '线上会议平台（Zoom/腾讯会议）',
        agenda: [
            '14:00 - 14:30 开场致辞',
            '14:30 - 15:30 主题演讲：前沿技术趋势',
            '15:30 - 16:00 茶歇',
            '16:00 - 17:00 圆桌讨论与交流'
        ],
        registration: '请发送邮件至 event@example.com 或扫描二维码报名'
    },
    2: {
        title: '创新工作坊',
        location: '创新中心',
        dateDay: '28',
        dateMonth: 'APR',
        description: '参与创新项目，与团队协作，将创意转化为产品原型。工作坊将提供实践机会，让参与者亲身体验从想法到原型的完整流程。',
        time: '2024年4月28日 09:00 - 18:00',
        address: '创新中心 3楼 会议室A',
        agenda: [
            '09:00 - 09:30 签到与欢迎',
            '09:30 - 11:00 创新思维训练',
            '11:00 - 12:00 项目分组与讨论',
            '12:00 - 13:30 午餐休息',
            '13:30 - 16:00 原型开发实践',
            '16:00 - 17:00 项目展示',
            '17:00 - 18:00 总结与交流'
        ],
        registration: '请通过官网报名或联系 innovation@example.com'
    },
    3: {
        title: '开发者大会',
        location: '科技园区',
        dateDay: '10',
        dateMonth: 'JUN',
        description: '参加年度开发者大会，聆听行业领袖的精彩演讲。大会将汇聚来自全球的技术专家，分享最新的技术成果和实践经验。',
        time: '2024年6月10日 - 6月12日 全天',
        address: '科技园区 国际会议中心',
        agenda: [
            '第一天：主题演讲与分论坛',
            '第二天：技术工作坊与实践',
            '第三天：项目展示与颁奖典礼'
        ],
        registration: '请访问官网 www.developerconference.com 进行注册'
    }
};

// Open modal function
function openEventModal(eventId) {
    const event = eventData[eventId];
    if (!event) return;

    // Fill modal with event data
    document.getElementById('modalTitle').textContent = event.title;
    document.getElementById('modalLocation').textContent = event.location;
    document.getElementById('modalDateDay').textContent = event.dateDay;
    document.getElementById('modalDateMonth').textContent = event.dateMonth;
    document.getElementById('modalDescription').textContent = event.description;
    document.getElementById('modalTime').textContent = event.time;
    document.getElementById('modalAddress').textContent = event.address;
    
    // Fill agenda
    const agendaList = document.getElementById('modalAgenda');
    agendaList.innerHTML = '';
    event.agenda.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        agendaList.appendChild(li);
    });
    
    document.getElementById('modalRegistration').textContent = event.registration;

    // Show modal
    eventModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeEventModal() {
    eventModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
eventLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const eventId = parseInt(link.getAttribute('data-event-id'));
        openEventModal(eventId);
    });
});

if (modalClose) {
    modalClose.addEventListener('click', closeEventModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeEventModal);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && eventModal.classList.contains('active')) {
        closeEventModal();
    }
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Project Modal
const projectModal = document.getElementById('projectModal');
const galleryItems = document.querySelectorAll('.gallery-item');
const projectModalClose = projectModal.querySelector('.modal-close');
const projectModalOverlay = projectModal.querySelector('.modal-overlay');

// Project data
const projectData = {
    1: {
        title: '智能汽车管理系统',
        image: 'resource/car.jpg',
        description: '一个基于现代Web技术的智能汽车管理系统，提供车辆信息管理、实时监控、数据分析等功能。系统采用响应式设计，支持多平台访问，为用户提供便捷的车辆管理体验。',
        tags: ['Web开发', '响应式设计', '数据可视化'],
        tech: [
            'React.js - 前端框架',
            'Node.js - 后端服务',
            'MongoDB - 数据库',
            'WebSocket - 实时通信',
            'Chart.js - 数据可视化'
        ],
        features: [
            '实时车辆位置追踪',
            '智能数据分析与报告',
            '多用户权限管理',
            '移动端适配',
            '数据导出功能'
        ],
        links: [
            { text: 'GitHub', url: 'https://github.com/example/project1', icon: 'github' },
            { text: '在线演示', url: 'https://demo.example.com', icon: 'external' }
        ]
    },
    2: {
        title: '文件下载管理系统',
        image: 'resource/download.jpg',
        description: '高效的文件下载管理系统，支持大文件分片下载、断点续传、下载队列管理等功能。系统具有良好的用户体验和稳定的性能表现，适用于各种文件下载场景。',
        tags: ['文件管理', '性能优化', '用户体验'],
        tech: [
            'Vue.js - 前端框架',
            'Express.js - 后端框架',
            'Redis - 缓存系统',
            'Nginx - 文件服务器',
            'Web Workers - 多线程处理'
        ],
        features: [
            '大文件分片下载',
            '断点续传功能',
            '下载队列管理',
            '下载速度控制',
            '文件预览功能'
        ],
        links: [
            { text: 'GitHub', url: 'https://github.com/example/project2', icon: 'github' },
            { text: '在线演示', url: 'https://demo.example.com', icon: 'external' }
        ]
    },
    3: {
        title: '云端协作平台',
        image: '',
        description: '一个功能强大的云端协作平台，支持团队协作、文档共享、项目管理等功能。平台采用微服务架构，具有良好的扩展性和稳定性。',
        tags: ['协作工具', '微服务', '云原生'],
        tech: [
            'Angular - 前端框架',
            'Spring Boot - 后端框架',
            'PostgreSQL - 数据库',
            'Docker - 容器化',
            'Kubernetes - 容器编排'
        ],
        features: [
            '实时协作编辑',
            '文件版本控制',
            '团队项目管理',
            '消息通知系统',
            '权限精细化管理'
        ],
        links: [
            { text: 'GitHub', url: 'https://github.com/example/project3', icon: 'github' }
        ]
    },
    4: {
        title: '智能数据分析平台',
        image: '',
        description: '基于人工智能的数据分析平台，提供数据挖掘、预测分析、可视化展示等功能。平台支持多种数据源接入，能够快速生成分析报告。',
        tags: ['数据分析', '人工智能', '机器学习'],
        tech: [
            'Python - 数据分析',
            'TensorFlow - 机器学习',
            'D3.js - 数据可视化',
            'Flask - Web框架',
            'Pandas - 数据处理'
        ],
        features: [
            '智能数据挖掘',
            '预测分析模型',
            '交互式可视化',
            '自动化报告生成',
            '多数据源支持'
        ],
        links: [
            { text: 'GitHub', url: 'https://github.com/example/project4', icon: 'github' }
        ]
    },
    5: {
        title: '移动应用开发框架',
        image: '',
        description: '一套完整的移动应用开发框架，支持跨平台开发，提供丰富的组件库和开发工具。框架具有良好的性能和开发体验。',
        tags: ['移动开发', '跨平台', '框架'],
        tech: [
            'React Native - 跨平台框架',
            'TypeScript - 类型系统',
            'Redux - 状态管理',
            'Jest - 单元测试',
            'CI/CD - 持续集成'
        ],
        features: [
            '跨平台支持',
            '丰富的组件库',
            '热更新功能',
            '性能优化',
            '完善的文档'
        ],
        links: [
            { text: 'GitHub', url: 'https://github.com/example/project5', icon: 'github' },
            { text: '文档', url: 'https://docs.example.com', icon: 'external' }
        ]
    },
    6: {
        title: '区块链应用系统',
        image: '',
        description: '基于区块链技术的应用系统，提供去中心化的数据存储和交易功能。系统采用智能合约技术，确保数据的安全性和透明性。',
        tags: ['区块链', '智能合约', '去中心化'],
        tech: [
            'Solidity - 智能合约',
            'Web3.js - 区块链交互',
            'Ethereum - 区块链平台',
            'IPFS - 分布式存储',
            'MetaMask - 钱包集成'
        ],
        features: [
            '智能合约部署',
            '去中心化存储',
            '安全交易系统',
            '数据不可篡改',
            '透明可追溯'
        ],
        links: [
            { text: 'GitHub', url: 'https://github.com/example/project6', icon: 'github' }
        ]
    }
};

// Open project modal function
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Fill modal with project data
    const modalImage = document.getElementById('projectModalImage');
    if (project.image) {
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalImage.style.display = 'block';
    } else {
        modalImage.style.display = 'none';
    }

    document.getElementById('projectModalTitle').textContent = project.title;
    document.getElementById('projectModalDescription').textContent = project.description;

    // Fill tags
    const tagsContainer = document.getElementById('projectModalTags');
    tagsContainer.innerHTML = '';
    project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'project-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    // Fill tech stack
    const techList = document.getElementById('projectModalTech');
    techList.innerHTML = '';
    project.tech.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        techList.appendChild(li);
    });

    // Fill features
    const featuresList = document.getElementById('projectModalFeatures');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Fill links
    const linksContainer = document.getElementById('projectModalLinks');
    linksContainer.innerHTML = '';
    project.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer';
        linkElement.className = 'project-link';
        linkElement.textContent = link.text;
        
        // Add icon SVG
        if (link.icon === 'github') {
            linkElement.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 19C4 20.5 4 16.5 2 16M22 16V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V16M16 8C16 6.93913 15.5786 5.92172 14.8284 5.17157C14.0783 4.42143 13.0609 4 12 4C10.9391 4 9.92172 4.42143 9.17157 5.17157C8.42143 5.92172 8 6.93913 8 8M16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8M16 8V13C16 13.5304 15.7893 14.0391 15.4142 14.4142C15.0391 14.7893 14.5304 15 14 15H10C9.46957 15 8.96086 14.7893 8.58579 14.4142C8.21071 14.0391 8 13.5304 8 13V8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${link.text}
            `;
        } else {
            linkElement.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 13V19A2 2 0 0 1 16 21H5A2 2 0 0 1 3 19V8A2 2 0 0 1 5 6H11M15 3H21M21 3V9M21 3L9 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${link.text}
            `;
        }
        
        linksContainer.appendChild(linkElement);
    });

    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project modal function
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for gallery items
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectId = parseInt(item.getAttribute('data-project-id'));
        openProjectModal(projectId);
    });
});

if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
}

if (projectModalOverlay) {
    projectModalOverlay.addEventListener('click', closeProjectModal);
}

