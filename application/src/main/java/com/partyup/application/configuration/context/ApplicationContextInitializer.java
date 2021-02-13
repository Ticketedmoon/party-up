package com.partyup.application.configuration.context;

import com.partyup.application.configuration.context.profile.PersistenceProfile;
import javax.annotation.Nonnull;
import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration.Dynamic;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

@ComponentScan(basePackages = "com.partyup")
@RequiredArgsConstructor
public class ApplicationContextInitializer implements WebApplicationInitializer {

    @Value("${application.active.profile}")
    private String activeProfile;

    private final PersistenceProfile persistenceProfile;

    @Override
    public void onStartup(@Nonnull ServletContext servletContext) {
        AnnotationConfigWebApplicationContext webApplicationContext = new AnnotationConfigWebApplicationContext();
        webApplicationContext.register(ApplicationContextInitializer.class);
        webApplicationContext.setServletContext(servletContext);

        Dynamic servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(webApplicationContext));
        servlet.setInitParameter("application.active.profile", activeProfile);
        servlet.setLoadOnStartup(1);
        servlet.addMapping("/");

        persistenceProfile.createDataSource();
    }
}
