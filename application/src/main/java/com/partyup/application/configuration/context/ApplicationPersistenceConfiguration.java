package com.partyup.application.configuration.context;

import java.util.Properties;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

@Configuration
@PropertySource("classpath:application.properties")
@Slf4j
public class ApplicationPersistenceConfiguration {

    @Bean
    public static PropertySourcesPlaceholderConfigurer placeholderConfigurer() {
        PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        propertySourcesPlaceholderConfigurer.setLocations(new ClassPathResource("application.properties"));
        return propertySourcesPlaceholderConfigurer;
    }

    @Profile("development")
    @Bean(name = "dataSource")
    public DataSource createDevelopmentDataSource(@Value("${dev.app.datasource.driver}") String driverClassName,
                                                  @Value("${dev.app.datasource.url}") String dataSourceUrl,
                                                  @Value("${dev.app.datasource.username}") String dataSourceUsername,
                                                  @Value("${dev.app.datasource.password}") String dataSourcePassword) {
        log.info("Data Source Creation for environment profile: [development]");
        return buildDataSource(driverClassName, dataSourceUrl, dataSourceUsername, dataSourcePassword);
    }

    @Profile("production")
    @Bean(name = "dataSource")
    public DataSource createProductionDataSource(@Value("${prod.app.datasource.driverClassName}") String driverClassName,
                                                 @Value("${prod.app.datasource.url}") String dataSourceUrl,
                                                 @Value("${prod.app.datasource.username}") String dataSourceUsername,
                                                 @Value("${prod.app.datasource.password}") String dataSourcePassword) {
        log.info("Data Source Creation for environment profile: [production]");
        return buildDataSource(driverClassName, dataSourceUrl, dataSourceUsername, dataSourcePassword);
    }

    @Bean(name = "entityManager")
    public LocalContainerEntityManagerFactoryBean createLocalContainerEntityManagerFactoryBean(DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
        factoryBean.setPackagesToScan("com.partyup");
        factoryBean.setDataSource(dataSource);

        Properties properties = new Properties();

        properties.setProperty("hibernate.show_sql", "true");
        properties.setProperty("hibernate.hbm2ddl.auto", "update");
        properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        factoryBean.setJpaProperties(properties);
        return factoryBean;
    }

    @Bean(name = "persistenceProvider")
    public HibernatePersistenceProvider createHibernatePersistenceProvider() {
        return new HibernatePersistenceProvider();
    }

    @Bean(name = "transactionManager")
    public JpaTransactionManager createJpaTransactionManager(DataSource dataSource) {
        JpaTransactionManager jpaTransactionManager = new JpaTransactionManager();
        jpaTransactionManager.setDataSource(dataSource);
        return jpaTransactionManager;
    }

    private DataSource buildDataSource(String driverClassName, String dataSourceUrl, String dataSourceUsername, String dataSourcePassword) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(dataSourceUrl);
        dataSource.setUsername(dataSourceUsername);
        dataSource.setPassword(dataSourcePassword);
        return dataSource;
    }

}
