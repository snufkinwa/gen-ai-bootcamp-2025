import asyncio
from app.services.cloudfront_service import CloudFrontService

async def test_fetch_json():
    filename = "kana-data.json"
    data = await CloudFrontService.fetch_json(filename)

    print("✅ Raw fetched data:", data) 

    # Ensure we are dealing with a list
    assert isinstance(data, list), f"Expected a list, got {type(data)}"

    # Separate containers for Hiragana & Katakana
    first_three_hiragana = []
    first_three_katakana = []

    for script_data in data:
        for script_type, kana_list in script_data.items():
            if script_type == "hiragana":
                first_three_hiragana.extend(kana_list[:3])  # Get first 3
            elif script_type == "katakana":
                first_three_katakana.extend(kana_list[:3])  # Get first 3

    # ✅ Improved print format
    print("\n✅ First 6 Kana Items Breakdown:")
    print("🟢 Hiragana:", first_three_hiragana)
    print("🔵 Katakana:", first_three_katakana)

# Run the test
if __name__ == "__main__":
    asyncio.run(test_fetch_json())

