FROM httpd:alpine
RUN apk --no-cache add curl
HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail http://localhost:80/ || exit 1
RUN rm -r /usr/local/apache2/htdocs/*
RUN sed -i 's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/a### Rewrite rule was written from the Dockerfile when building the image ###\n\
    DirectoryIndex index.html\n\
    RewriteEngine on\n\
    RewriteCond %{REQUEST_FILENAME} -s [OR]\n\
    RewriteCond %{REQUEST_FILENAME} -d\n\
    RewriteRule ^.*$ - [NC,L]\n\
    RewriteRule ^(.*) index.html [NC,L]\n' \
  /usr/local/apache2/conf/httpd.conf
RUN sed -i '/<Files "\.ht\*">/,/<\/Files>/c# This was commented out from the Dockerfile\n# <Files ".ht*">\n#     Require all denied\n# <\/Files>' /usr/local/apache2/conf/httpd.conf
COPY ./dist/live-poll /usr/local/apache2/htdocs/
RUN chown -R root:daemon /usr/local/apache2/htdocs/*
RUN chmod -R 440 /usr/local/apache2/htdocs/*
RUN find /usr/local/apache2/htdocs/ -mindepth 1 -type d -exec chmod +x {} \;