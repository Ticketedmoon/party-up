A special directory exists within the application hierarchy named `WEB-INF`. 
This directory contains all things related to the application that aren’t in the document root of the application.  

The `WEB-INF` node is not part of the public document tree of the application. 
No file contained in the WEB-INF directory may be served directly to a client by the container.  

However, the contents of the WEB-INF directory are `visible to servlet code` using the `getResource
and getResourceAsStream` method calls on the `ServletContext`, and may be exposed using the `RequestDispatcher` calls.

This means that WEB-INF resources are accessible to the resource loader of your Web-Application and not directly visible for the public.

This is why a lot of projects put their resources like JSP files, JARs/libraries and their own class files or property
files or any other sensitive information in the WEB-INF folder. Otherwise they would be accessible by 
using a `simple static URL` (useful to load CSS or Javascript for instance).
