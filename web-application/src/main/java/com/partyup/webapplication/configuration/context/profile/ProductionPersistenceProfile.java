package com.partyup.webapplication.configuration.context.profile;

import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Slf4j
@Profile("prod")
@Configuration
public class ProductionPersistenceProfile implements PersistenceProfile {

    @Value("${prod.app.datasource.driver}")
    private String driverClassName;

    @Value("${prod.app.datasource.url}")
    private String dataSourceUrl;

    @Value("${prod.app.datasource.username}")
    private String dataSourceUsername;

    @Value("${prod.app.datasource.password}")
    private String dataSourcePassword;

    @Bean(name = "dataSource")
    @Override
    public DataSource createDataSource() {
        log.info("Data Source Creation for environment profile: [production]");
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(dataSourceUrl);
        dataSource.setUsername(dataSourceUsername);
        dataSource.setPassword(dataSourcePassword);
        return dataSource;
    }

}
