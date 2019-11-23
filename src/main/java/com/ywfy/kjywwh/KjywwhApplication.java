package com.ywfy.kjywwh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class KjywwhApplication {

    public static void main(String[] args) {
        SpringApplication.run(KjywwhApplication.class, args);
        System.out.println("项目启动成功。。。");
    }

}
