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
public class dangdangCrawler {
    static String base_url = "http://search.dangdang.com/?key=";

    public static List<Item> search(String keyword) {
        String url = base_url + keyword;
        try {
            EdgeOptions options = new EdgeOptions();
            options.addArguments("--headless=old");

            WebDriver driver = new EdgeDriver(options);
            
            driver.get(url);
            
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            // 确保页面加载完成
            Thread.sleep(7000);

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
            Elements elements = document.getElementsByClass("bigimg");
            Elements liLiElements = elements.select("li");
            List<Item> items = new ArrayList<Item>();
            // 截取前30个商品，去掉第一个
            liLiElements.remove(0);            
            for (Element liElement : liLiElements) {                
                Item item = new Item();
                item.setPlatform("当当");
                                
                String name = liElement.select("a").attr("title");
                item.setDescription(name);
                System.out.println(name);

                // <span class="search_now_price">¥<span>9.90</span></span>
                String price = liElement.select("span.search_now_price").text();                
                if (price == null || price.equals("")) {
                    continue;
                } else {
                    price = price.replaceAll("[^0-9.]", "");
                }
                System.out.println(price);
                item.setPrice(Double.valueOf(price));

                String url = liElement.select("a").attr("href");
                item.setDetail_url(url);
                System.out.println(url);
                
                // <img data-original="//img3m8.ddimg.cn/34/24/29806558-1_b_1731482459.jpg" src="//img3m8.ddimg.cn/34/24/29806558-1_b_1731482459.jpg" alt=" 线性代数精选450题" style="display: block;">
                String img = liElement.select("img").attr("data-original");
                item.setImg(img);
                System.out.println(img);
                
                // <a href="//shop.dangdang.com/21409" name="itemlist-shop-name" dd_name="单品店铺" target="_blank" title="贝乐母婴专营店">贝乐母婴专营店</a>
                String shopName = liElement.select("a[name=itemlist-shop-name]").text();
                item.setShop_name(shopName);
                System.out.println(shopName);

                item.setTime(LocalDateTime.now());

                items.add(item);

                if (items.size() >= 50) {
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
