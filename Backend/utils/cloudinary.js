const cloudinary = require("cloudinary")

cloudinary.config({ 
    cloud_name: 'dcifgwwja', 
    api_key: '343435232753228', 
    api_secret: 'eBTzMaJzbVz3rYU9noVACVcatG8' 
  });

  module.exports = cloudinary;