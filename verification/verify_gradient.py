import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async def handle_route(route):
        if any(domain in route.request.url for domain in ["fonts.googleapis.com", "cdn.tailwindcss.com"]):
            await route.abort()
        else:
            await route.continue_()

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        await page.route("**/*", handle_route)

        file_path = f"file://{os.getcwd()}/First_Light.html"
        await page.goto(file_path)

        # Wait for the glass panel
        panel = await page.wait_for_selector(".glass-panel")

        # Initial style
        initial_style = await panel.evaluate("el => el.style.background")
        print(f"Initial style: {initial_style}")

        # Move mouse to center of panel
        box = await panel.bounding_box()
        await page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)

        # Check style again
        await asyncio.sleep(0.5)
        new_style = await panel.evaluate("el => el.style.background")
        print(f"New style: {new_style}")

        await page.screenshot(path="verification/screenshots/verification.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
