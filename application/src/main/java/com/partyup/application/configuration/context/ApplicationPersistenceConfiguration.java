package com.partyup.application.configuration.context;

import java.util.Properties;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

@Configuration
@Slf4j
@PropertySource("classpath:application.properties")
@EnableJpaRepositories("com.partyup.application.repository")
@ComponentScan(basePackages = "com.partyup.application.configuration.context")
public class ApplicationPersistenceConfiguration {

    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean createLocalContainerEntityManagerFactoryBean(DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
        factoryBean.setDataSource(dataSource);
        factoryBean.setPackagesToScan("com.partyup");
        factoryBean.setPersistenceUnitName("partyup.persistence.unit");
        factoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        Properties properties = new Properties();

        properties.setProperty("hibernate.show_sql", "true");
        properties.setProperty("hibernate.hbm2ddl.auto", "update");
        properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        properties.setProperty("hibernate.ejb.naming_strategy", "org.hibernate.cfg.ImprovedNamingStrategy");
        properties.setProperty("hibernate.format_sql", "true");
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

}
