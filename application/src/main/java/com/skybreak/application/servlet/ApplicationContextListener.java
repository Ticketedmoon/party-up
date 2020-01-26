package com.skybreak.application.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

public class ApplicationContextListener implements ServletContextListener {

    private static final Logger LOGGER = Logger.getLogger(ApplicationContextListener.class);

    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        LOGGER.error("Servlet Context Destroyed");
    }

    @Override
    public void contextInitialized(ServletContextEvent event) {
        ServletContext context = event.getServletContext();
        System.setProperty("initializeURL", context.getInitParameter("initializeURL"));
        System.setProperty("rootPath", context.getRealPath("/"));
        LOGGER.error("Servlet Context Initialized");
    }

}
