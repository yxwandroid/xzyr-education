// 学知盈瑞教育网站交互功能

document.addEventListener('DOMContentLoaded', function() {

    // 获取DOM元素
    const contactModal = document.getElementById('contactModal');
    const qrcodeModal = document.getElementById('qrcodeModal');
    const closeModal = document.getElementById('closeModal');
    const closeQrModal = document.getElementById('closeQrModal');
    const wechatOption = document.getElementById('wechatOption');
    const qqOption = document.getElementById('qqOption');
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
    function showQrcodeModal() {
        hideContactModal();
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
            showQrcodeModal();

            // 复制微信号到剪贴板
            copyToClipboard('xuezyr2024');
            showMessage('微信号已复制到剪贴板', 'success');
        });
    }

    // QQ联系方式点击
    if (qqOption) {
        qqOption.addEventListener('click', function() {
            // 记录用户选择
            trackUserAction('contact_method', 'qq');

            const qqNumber = '1234567890';

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

            const email = 'info@xuezyr.com';
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