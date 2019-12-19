from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import ElementNotInteractableException


EXE_PATH = r'chromedriver_win32\chromedriver.exe'
# options = webdriver.ChromeOptions()
# options.add_argument("--headless")
driver = webdriver.Chrome(executable_path=EXE_PATH) # , chrome_options=options

driver.get('http://eportal.esspl.com/signin')
print(driver.title)


uname = driver.find_element_by_id("_58_login")
pwd = driver.find_element_by_id("_58_password")
uname.send_keys("santosh")
pwd.send_keys("santosh")

btnsubmit = driver.find_element_by_id("loginsubmit")
btnsubmit.click()
wait = WebDriverWait(driver, 5)
mytime = driver.find_element_by_class_name("myTime")
print(mytime.text)

try:
    menu_logout = driver.find_element_by_xpath('//a[@class="user-avatar-link dropdown-toggle"]')
    menu_logout.click()
    logout = driver.find_element_by_xpath('//a[@href="/c/portal/logout"]')
    logout.click()
except ElementNotInteractableException as e:
    print(e.__doc__)
finally:
    driver.close()


