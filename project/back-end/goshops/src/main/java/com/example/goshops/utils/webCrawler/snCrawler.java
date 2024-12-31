package com.example.goshops.utils.webCrawler;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import com.example.goshops.model.Item;

public class snCrawler {
    static String base_url = "https://search.suning.com/";

    public static List<Item> search(String keyword) {
        String url = base_url + keyword + "/";
        try {
            EdgeOptions options = new EdgeOptions();
            options.addArguments("--headless=old");

            WebDriver driver = new EdgeDriver(options);
            
            driver.get(url);
            
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            // 确保页面加载完成
            Thread.sleep(5000);

            String pageSource = driver.getPageSource();            

            // 解析页面源代码
            Document document = Jsoup.parse(pageSource);

            driver.quit();
            
            // System.out.println(document);
            return extractItems(document, keyword);
            
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public static List<Item> extractItems(Document document, String keyword) {
         try {
            Elements elements = document.getElementsByClass("general clearfix");            
            Elements liLiElements = elements.select("li");
            List<Item> items = new ArrayList<Item>();
            // 截取前50个商品            
            for (Element liElement : liLiElements) {                

                Item item = new Item();
                item.setPlatform("苏宁");
                
                // 商品名称
                String productName = liElement.select(".title-selling-point a").text();
                System.out.println("Prduct Name:" + productName + "\n");
                item.setDescription(productName);
                

                // 商品价格                
                String price = liElement.select("span.def-price").text();
                if (price == null || price.equals("")) {
                    continue;
                } else {
                    price = price.replaceAll("[^0-9.]", "");
                }
                System.out.println("Price:" + price + "\n");
                item.setPrice(Double.valueOf(price));


                // 商品店铺
                String shopName = liElement.select("store-name").text();
                System.out.println("Shop Name:" + shopName + "\n");
                item.setShop_name(shopName);
                
                // 商品图片链接
                String img = liElement.select(".res-img img").attr("src");
                System.out.println("Img:" + img + "\n");
                item.setImg(img);

                // 商品链接
                String detail_url = liElement.select(".res-img a").attr("href");
                System.out.println("Detail URL:" + detail_url + "\n");
                item.setDetail_url(detail_url);

                // 商品时间
                LocalDateTime time = LocalDateTime.now();
                item.setTime(time);
                items.add(item);   
                
                if (items.size() == 20) {
                    break;
                }
            }
            return items;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }

    }    
}
