package com.partyup.application.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ApplicationContextListener implements ServletContextListener {

    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        log.info("Servlet Context Destroyed");
    }

    @Override
    public void contextInitialized(ServletContextEvent event) {
        ServletContext context = event.getServletContext();
        System.setProperty("initializeURL", context.getInitParameter("initializeURL"));
        System.setProperty("rootPath", context.getRealPath("/"));
        log.info("Servlet Context Initialized");
    }

}
