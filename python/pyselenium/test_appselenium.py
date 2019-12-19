import unittest
from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import ElementNotInteractableException
import allure


class Eportal(unittest.TestCase):
    EXE_PATH = r'chromedriver_win32\chromedriver.exe'
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(executable_path=EXE_PATH, chrome_options=options)

    def test_eportal_login(self):
        self.test_launch_site()
        self.test_verify_login()
        self.test_eportal_signout()

    @allure.step("Launch eportal")
    def test_launch_site(self):
        self.driver.get('http://eportal.esspl.com/signin')
        print(self.driver.title)
        yield

    @allure.step("Verify Login")
    def test_verify_login(self):
        uname = self.driver.find_element_by_id("_58_login")
        pwd = self.driver.find_element_by_id("_58_password")
        uname.send_keys("santosh")
        pwd.send_keys("santosh")

        btnsubmit = self.driver.find_element_by_id("loginsubmit")
        btnsubmit.click()
        wait = WebDriverWait(self.driver, 5)
        mytime = self.driver.find_element_by_class_name("myTime")
        print(mytime.text)
        yield

    @allure.step("Eportal signout")
    def test_eportal_signout(self):
        try:
            menu_logout = self.driver.find_element_by_xpath('//a[@class="user-avatar-link dropdown-toggle"]')
            menu_logout.click()
            logout = self.driver.find_element_by_xpath('//a[@href="/c/portal/logout"]')
            logout.click()
            yield
        except ElementNotInteractableException as e:
            print(e.__doc__)
        finally:
            self.driver.close()


if __name__ == '__main__':
    unittest.main()
