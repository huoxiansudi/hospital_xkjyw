package com.ywfy.kjywwh;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class KjywwhApplicationTests {

    @Test
    void contextLoads() {
    }

    public static void main(String[] args) {
        /*int[] arr={1,2,3,1,4,1,1};
        int count=0;
        for (int dd:arr) {
            if(dd==1){
                count++;
            }
        }*/
        String count = "abcd234";
        String aa = count.substring(1,2);
        System.out.println(aa);
    }

}
