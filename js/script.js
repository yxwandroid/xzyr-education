// 学知盈瑞教育网站交互功能

document.addEventListener('DOMContentLoaded', function() {

    // 获取DOM元素
    const contactModal = document.getElementById('contactModal');
    const qrcodeModal = document.getElementById('qrcodeModal');
    const closeModal = document.getElementById('closeModal');
    const closeQrModal = document.getElementById('closeQrModal');
    const wechatOption = document.getElementById('wechatOption');
    const qqOption = document.getElementById('qqOption');
    const douyinOption = document.getElementById('douyinOption');
    const phoneOption = document.getElementById('phoneOption');
    const emailOption = document.getElementById('emailOption');

    // 显示联系方式选择弹窗
    function showContactModal() {
        if (contactModal) {
            contactModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    // 隐藏联系方式选择弹窗
    function hideContactModal() {
        if (contactModal) {
            contactModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // 显示二维码弹窗
    function showQrcodeModal(type, title, contactInfo, tip, imagePath) {
        hideContactModal();

        // 更新弹窗内容
        const qrModalTitle = document.getElementById('qrModalTitle');
        const qrContactInfo = document.getElementById('qrContactInfo');
        const qrTip = document.getElementById('qrTip');
        const qrcodePlaceholder = document.getElementById('qrcodePlaceholder');
        const qrcodeImage = document.getElementById('qrcodeImage');
        const qrImg = document.getElementById('qrImg');
        const qrImgInfo = document.getElementById('qrImgInfo');
        const qrImgTip = document.getElementById('qrImgTip');

        if (qrModalTitle) qrModalTitle.textContent = title;

        if (imagePath && qrcodeImage && qrImg) {
            // 显示实际二维码图片
            qrImg.src = imagePath;
            qrImgInfo.textContent = contactInfo;
            qrImgTip.textContent = tip;
            qrcodePlaceholder.style.display = 'none';
            qrcodeImage.style.display = 'block';
        } else {
            // 显示占位符
            qrContactInfo.textContent = contactInfo;
            qrTip.textContent = tip;
            qrcodeImage.style.display = 'none';
            qrcodePlaceholder.style.display = 'block';
        }

        // 显示弹窗
        if (qrcodeModal) {
            qrcodeModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    // 隐藏二维码弹窗
    function hideQrcodeModal() {
        if (qrcodeModal) {
            qrcodeModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // 关闭弹窗事件
    if (closeModal) {
        closeModal.addEventListener('click', hideContactModal);
    }

    if (closeQrModal) {
        closeQrModal.addEventListener('click', hideQrcodeModal);
    }

    // 点击遮罩层关闭弹窗
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                hideContactModal();
            }
        });
    }

    if (qrcodeModal) {
        qrcodeModal.addEventListener('click', function(e) {
            if (e.target === qrcodeModal) {
                hideQrcodeModal();
            }
        });
    }

    // 微信联系方式点击
    if (wechatOption) {
        wechatOption.addEventListener('click', function() {
            // 记录用户选择
            trackUserAction('contact_method', 'wechat');

            // 显示二维码弹窗
            showQrcodeModal('wechat', '扫码添加微信', '微信号：18001023126', '请扫码添加微信好友咨询学历方案', 'images/weixin.png');

            // 复制微信号到剪贴板
            copyToClipboard('18001023126');
            showMessage('微信号已复制到剪贴板', 'success');
        });
    }

    // QQ联系方式点击
    if (qqOption) {
        qqOption.addEventListener('click', function() {
            // 记录用户选择
            trackUserAction('contact_method', 'qq');

            const qqNumber = '421691767';

            // 尝试打开QQ
            const qqUrl = `tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=${qqNumber}&website=www.oicqzone.com`;
            const webQqUrl = `https://wpa.qq.com/msgrd?v=3&uin=${qqNumber}&site=qq&menu=yes`;

            // 首先尝试打开QQ客户端
            const tempLink = document.createElement('a');
            tempLink.href = qqUrl;
            tempLink.style.display = 'none';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

            // 延迟后打开Web QQ作为备选
            setTimeout(() => {
                window.open(webQqUrl, '_blank');
            }, 1000);

            // 复制QQ号
            copyToClipboard(qqNumber);
            showMessage('QQ号已复制到剪贴板，正在打开QQ...', 'success');

            hideContactModal();
        });
    }

    // 邮件联系方式点击
    if (emailOption) {
        emailOption.addEventListener('click', function() {
            // 记录用户选择
            trackUserAction('contact_method', 'email');

            const email = '421691767@qq.com';
            const subject = encodeURIComponent('学历提升咨询');

            const body = encodeURIComponent(`您好！

我想了解学历提升相关信息，请为我提供详细的学历提升方案和相关信息。

期待您的回复，谢谢！`);

            const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

            // 打开邮件客户端
            window.location.href = mailtoUrl;

            // 复制邮箱地址
            copyToClipboard(email);
            showMessage('邮箱地址已复制，正在打开邮件客户端...', 'success');

            hideContactModal();
        });
    }

    // 抖音联系方式点击
    if (douyinOption) {
        douyinOption.addEventListener('click', function() {
            // 记录用户选择
            trackUserAction('contact_method', 'douyin');

            // 显示抖音二维码弹窗
            showQrcodeModal('douyin', '扫码关注抖音', '抖音号：18001023126', '请扫码关注抖音号或点击跳转至抖音主页', 'images/douyin.png');

            // 尝试打开抖音客户端和网页版
            const douyinAppUrl = 'snssdk1128://user/profile/MS4wLjABAAAAO8RAoZHKQsEq2nS4pMB1w5y9k7kkke2YTlRQSBjDWlJ6cGG149OiAVLhfzjTSQEw';
            const douyinWebUrl = 'https://m.douyin.com/share/user/MS4wLjABAAAAO8RAoZHKQsEq2nS4pMB1w5y9k7kkke2YTlRQSBjDWlJ6cGG149OiAVLhfzjTSQEw';

            // 先尝试打开APP
            const tempLink = document.createElement('a');
            tempLink.href = douyinAppUrl;
            tempLink.style.display = 'none';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

            // 延迟后打开网页版作为备选
            setTimeout(() => {
                window.open(douyinWebUrl, '_blank');
            }, 1000);

            // 复制抖音号
            copyToClipboard('18001023126');
            showMessage('抖音号已复制，正在打开抖音...', 'success');
        });
    }

    // 电话联系方式点击
    if (phoneOption) {
        phoneOption.addEventListener('click', function() {
            // 记录用户选择
            trackUserAction('contact_method', 'phone');

            // 显示手机号二维码弹窗
            showQrcodeModal('phone', '扫码拨打电话', '手机号：18001023126', '请扫码拨打电话或直接复制手机号', 'images/tel_18001023126.png');

            // 复制手机号
            copyToClipboard('18001023126');
            showMessage('手机号已复制到剪贴板', 'success');
        });
    }

    // 复制到剪贴板功能
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            // 使用现代API
            navigator.clipboard.writeText(text).catch(err => {
                console.error('复制失败:', err);
                fallbackCopyTextToClipboard(text);
            });
        } else {
            // 降级方案
            fallbackCopyTextToClipboard(text);
        }
    }

    // 降级复制方案
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('降级复制也失败了:', err);
        }

        document.body.removeChild(textArea);
    }

    // 显示消息提示
    function showMessage(message, type = 'info') {
        // 移除已存在的消息
        const existingMessage = document.querySelector('.toast-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 创建消息元素
        const messageDiv = document.createElement('div');
        messageDiv.className = `toast-message toast-${type}`;
        messageDiv.textContent = message;

        // 样式
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? '#f44336' : '#4CAF50'};
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 3000;
            font-size: 14px;
            font-weight: 500;
            animation: slideInDown 0.3s ease;
            max-width: 90%;
            text-align: center;
        `;

        // 添加到页面
        document.body.appendChild(messageDiv);

        // 3秒后自动移除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOutUp 0.3s ease';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    // 用户行为追踪
    function trackUserAction(action, value) {
        const trackingData = {
            action: action,
            value: value,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            userAgent: navigator.userAgent
        };

        // 存储到本地存储
        const existingData = JSON.parse(localStorage.getItem('userTracking') || '[]');
        existingData.push(trackingData);
        localStorage.setItem('userTracking', JSON.stringify(existingData));

        // 这里可以发送到分析服务
        console.log('用户行为追踪:', trackingData);
    }

    // 导航平滑滚动
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 移动端导航切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击导航链接后关闭菜单
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 为所有可点击按钮添加联系方式弹窗
    const clickableButtons = [
        // 主横幅按钮
        '.hero-buttons .btn',
        // 主横幅咨询按钮
        '.consultation-btn',
        // 服务优势按钮
        '.advantage-item .btn',
        // 教育类型按钮
        '.education-item .btn',
        // 专业类别按钮
        '.major-category .btn',
        // 院校按钮
        '.university-item .btn',
        // 规划指南按钮
        '.education-planning .btn',
        // 悬浮咨询按钮
        '.contact-btn',
        // 侧边栏咨询按钮
        '.sidebar-consult',
        // 侧边栏专业链接
        '.sidebar-item',
        // 底部链接（可选）
        '.footer-section a[href="#"]'
    ];

    // 统一处理所有按钮点击事件
    clickableButtons.forEach(selector => {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();

                // 获取按钮类型用于追踪
                const buttonType = getButtonType(this);
                trackUserAction('click', buttonType);


                // 显示联系方式弹窗
                showContactModal();
            });
        });
    });

    // 获取按钮类型用于数据追踪
    function getButtonType(button) {
        if (button.closest('.hero-buttons')) return 'hero_button';
        if (button.classList.contains('consultation-btn')) return 'hero_consultation';
        if (button.closest('.advantage-item')) return 'advantage_button';
        if (button.closest('.education-item')) return 'education_button';
        if (button.closest('.major-category')) return 'major_button';
        if (button.closest('.university-item')) return 'university_button';
        if (button.closest('.education-planning')) return 'planning_button';
        if (button.classList.contains('contact-btn')) return 'floating_contact';
        if (button.classList.contains('sidebar-consult')) return 'sidebar_consult';
        if (button.classList.contains('sidebar-item')) return 'sidebar_major';
        if (button.closest('.footer-section')) return 'footer_link';
        return 'other_button';
    }

    // 滚动动画
    function animateOnScroll() {
        const elements = document.querySelectorAll('.advantage-item, .education-item, .major-category, .university-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-up');
            }
        });
    }

    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);

    // 页面加载时检查一次
    animateOnScroll();



    // 院校轮播功能
    function initUniversityCarousel() {
        const carousel = document.querySelector('.universities-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.university-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');

        let currentSlide = 0;
        let isTransitioning = false;
        let autoPlayInterval;

        // 显示指定幻灯片
        function showSlide(index, direction = 'next') {
            if (isTransitioning || index === currentSlide) return;

            isTransitioning = true;

            // 更新活动幻灯片
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');

            currentSlide = index;

            // 计算transform值
            const translateX = -currentSlide * 20; // 每个幻灯片占20%
            const carouselWrapper = carousel.querySelector('.carousel-wrapper');

            if (carouselWrapper) {
                carouselWrapper.style.transform = `translateX(${translateX}%)`;
            }

            // 更新活动状态
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');

            setTimeout(() => {
                isTransitioning = false;
            }, 500);

            // 记录用户交互
            trackUserAction('carousel_navigate', `slide_${currentSlide}`);
        }

        // 下一张幻灯片
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex, 'next');
        }

        // 上一张幻灯片
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex, 'prev');
        }

        // 开始自动播放
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 8000); // 8秒切换一次
        }

        // 停止自动播放
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // 绑定控制按钮事件
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoPlay();
                prevSlide();
                startAutoPlay(); // 重新开始自动播放
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoPlay();
                nextSlide();
                startAutoPlay(); // 重新开始自动播放
            });
        }

        // 绑定指示器事件
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoPlay();
                showSlide(index);
                startAutoPlay(); // 重新开始自动播放
            });
        });

        // 触摸滑动支持
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            stopAutoPlay(); // 触摸时停止自动播放
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            // 确保是水平滑动而不是垂直滑动
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide(); // 向左滑动，下一张
                } else {
                    prevSlide(); // 向右滑动，上一张
                }
            }

            startAutoPlay(); // 重新开始自动播放
        });

        // 鼠标悬停控制
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // 键盘导航支持
        document.addEventListener('keydown', (e) => {
            if (!carousel.matches(':hover')) return; // 只有当鼠标悬停在轮播上时才响应键盘

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopAutoPlay();
                prevSlide();
                startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            }
        });

        // 页面可见性变化时控制自动播放
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });

        // 初始化第一张幻灯片
        if (slides.length > 0 && indicators.length > 0) {
            showSlide(0);
        }

        // 初始化时启动自动播放
        startAutoPlay();

        // 滚动到视图中时的动画效果
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    trackUserAction('section_view', 'universities_carousel');
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(carousel);
    }

    // 初始化轮播
    initUniversityCarousel();

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }

        @keyframes slideOutUp {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
});