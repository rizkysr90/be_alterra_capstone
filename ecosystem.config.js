module.exports = {
    apps : [{
      name: "secondhand_app",
      script: "./bin/www",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }
  