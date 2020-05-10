package com.codewars.application.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ApplicationContextListener implements ServletContextListener {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationContextListener.class);

    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        LOGGER.info("Servlet Context Destroyed");
    }

    @Override
    public void contextInitialized(ServletContextEvent event) {
        ServletContext context = event.getServletContext();
        System.setProperty("initializeURL", context.getInitParameter("initializeURL"));
        System.setProperty("rootPath", context.getRealPath("/"));
        LOGGER.info("Servlet Context Initialized");
    }

}
