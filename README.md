# Insect API
This easy to use API lets users learn about isects from different regions by allowing them to browse community uploaded insect images and basic data.

**Link to project:** insect-api.herokuapp.com//

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Framework of choice

This API is built using Node.js, and Express. Multer was used as the middleware to randomly name the image files upon being uploaded to the server. The text data is stored using MongoDB, and the image files are stored using AWS S3. Enjoy!

## Optimizations
*(optional)*

Performance:
- Resize uploads for uniform image sizing:
Image load times vary be file size, so resizing upon upload would provide a more streamlined experience by making image loading faster, and more uniform.

Infrastructure:
- Change to MVC structure:
The app currently uses a flat file structure, but this would quickly get harder to navigate once more features are eventually added. MVC would provide a more robust structure that would scale once fetures like authentication are added.

Security:
Authentication: For the sake of throttling requests and and being able to identify users and sessions, authentication will be necessary.

## Lessons Learned:

- This was my first exposure to AWS products and services. I found their documentation to be a bit unclear at times, but as always, it was nothing a little experimentation couldn't solve.

Some take-aways:

1) Be EXACT in naming your environmental vaiables when using amazon web services. I initially thought I could name me vcariables and declare them on my AWS account - not so. They want you to name your environment variables:
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION

2) Multer conviniently (randomly) names uploaded files, saving you the trouble of having to come up with a naming algorithm if you have no explicit NEED for a naming convention





