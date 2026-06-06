import json
import os

with open('recovered_page.txt', 'r') as f:
    content_raw = f.read()

# content_raw is currently a JSON encoded string (with starting and ending quotes)
# We can decode it using json.loads
content_raw = content_raw.strip()

# If it's a huge single string, json.loads might fail if it's truncated or weird.
# Wait, my recovered_page.txt just wrote the exact string extracted from the JSON object.
# Let me decode it properly:
try:
    content = json.loads(content_raw)
except Exception as e:
    # If not a valid JSON string, we might need to manually unescape or eval it
    try:
        content = eval(content_raw)
    except:
        content = content_raw # Fallback

target_dir = 'src/app/dashboard/simulators/interstates'
os.makedirs(target_dir, exist_ok=True)
with open(os.path.join(target_dir, 'page.tsx'), 'w') as f:
    f.write(content)

print("Restored successfully.")
