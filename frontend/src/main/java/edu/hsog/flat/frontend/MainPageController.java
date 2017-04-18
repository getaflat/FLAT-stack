package edu.hsog.flat.frontend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

@Controller
public class MainPageController {
	@Value("${edu.hsog.flat.frontend.bundleJS}")
	private boolean bundleJS;

	@RequestMapping("/")
	public String index(Model model) {
		model.addAttribute("bundleJS", bundleJS);
		return "index.html";
	}
}