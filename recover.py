import json

file_path = "/Users/yahyokhonisroilov/.gemini/antigravity/brain/3c0f04b8-c5c7-4fbc-a222-9d6011185e14/.system_generated/logs/transcript.jsonl"
target_file = "/Users/yahyokhonisroilov/.gemini/antigravity/scratch/dispatcher-academy/frontend/src/app/dashboard/simulators/interstates/page.tsx"

content = None

with open(file_path, "r") as f:
    for line in f:
        try:
            data = json.loads(line)
            if "tool_calls" in data:
                for call in data["tool_calls"]:
                    if call["name"] == "write_to_file" and target_file in call.get("args", {}).get("TargetFile", ""):
                        content = call["args"].get("CodeContent")
        except:
            pass

if content:
    with open("recovered_page.txt", "w") as out:
        out.write(content)
    print("Recovered from write_to_file!")
else:
    print("Could not find full write_to_file. Let me try finding replace_file_content.")
