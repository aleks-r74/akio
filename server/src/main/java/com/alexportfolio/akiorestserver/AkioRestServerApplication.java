package com.alexportfolio.akiorestserver;

import lombok.Getter;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.util.TimeZone;

@SpringBootApplication
@EnableScheduling
@EnableAspectJAutoProxy
@EnableMethodSecurity(jsr250Enabled=true)
@EnableCaching
public class AkioRestServerApplication {

	@Getter
    private static ConfigurableApplicationContext context = null;
	private static ClassLoader mainThreadClassLoader;

	public static void main(String[] args) {
		mainThreadClassLoader = Thread.currentThread().getContextClassLoader();
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Yekaterinburg"));
		context = SpringApplication.run(AkioRestServerApplication.class, args);
	}

	// restarts the app. not used in the current version.
	public static void restart() {
		ApplicationArguments args = context.getBean(ApplicationArguments.class);
		Thread thread = new Thread(() -> {
			context.close();
			context = SpringApplication.run(AkioRestServerApplication.class, args.getSourceArgs());
		});
		thread.setContextClassLoader(mainThreadClassLoader);
		thread.setDaemon(false);
		thread.start();
	}

}
