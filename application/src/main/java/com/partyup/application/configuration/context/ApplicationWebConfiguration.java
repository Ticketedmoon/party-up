package com.partyup.application.configuration.context;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Configuration
@ComponentScan(basePackages = "com.partyup")
public class ApplicationWebConfiguration implements WebMvcConfigurer {

    @Value("${app.view.resolver.prefix}")
    private String viewPrefix;

    @Value("${app.view.resolver.suffix}")
    private String viewSuffix;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/resources/")
                .setCachePeriod(3600);
        registry.addResourceHandler("/react/**")
                .addResourceLocations("/react/")
                .setCachePeriod(3600);
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp().prefix(viewPrefix).suffix(viewSuffix);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
    }

}