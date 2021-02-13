package com.partyup.application.configuration.context;

import java.util.Properties;
import javax.sql.DataSource;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

@Configuration
public class ApplicationPersistenceConfiguration {

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

}
