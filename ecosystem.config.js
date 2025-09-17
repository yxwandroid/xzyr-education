module.exports = {
  apps: [{
    name: 'zhiyingrui-education',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 8088
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8088
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_restarts: 10,
    min_uptime: '10s'
  }],

  deploy: {
    production: {
      user: 'node',
      host: 'your-server-ip',
      ref: 'origin/master',
      repo: 'git@github.com:username/zhiyingrui-education.git',
      path: '/var/www/production',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};