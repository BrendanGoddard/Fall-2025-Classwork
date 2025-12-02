package info5153.casestudy.server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RoutingController {

    // These have to match the routes defined in your client's app.routes.ts
    @RequestMapping({ "/vendors", "/products", "/generator", "/viewer" })
    public String index() {
        return "forward:/index.html";
    }
}