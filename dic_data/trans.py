import json
import os
# 本文件由AI生成，用于本地提取json中需要的字段
source_folder = 'D:\\Code\\QSCTech_Group6\\dic_data\\original_data'
output_file = 'extracted_data.json'

extracted_data = []

# 遍历源文件夹中的所有 JSON 文件
for filename in os.listdir(source_folder):
    if filename.endswith('.json'):
        filepath = os.path.join(source_folder, filename)
        with open(filepath, 'r', encoding='utf-8') as file:
            # 逐行读取文件，每行是一个独立的 JSON 对象
            for line in file:
                try:
                    # 尝试将每一行解析为 JSON 对象
                    data = json.loads(line)
                    
                    # 提取需要的字段
                    extracted_item = {
                        'wordRank': data.get('wordRank'),
                        'headWord': data.get('headWord'),
                        'trans': data['content']['word']['content']['trans'] if 'content' in data and 'word' in data['content'] and 'content' in data['content']['word'] and 'trans' in data['content']['word']['content'] else []
                    }
                    extracted_data.append(extracted_item)
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON in file {filename}: {e}")

# 将提取的数据写入新的 JSON 文件
with open(output_file, 'w', encoding='utf-8') as file:
    json.dump(extracted_data, file, ensure_ascii=False, indent=4)

print("Extraction complete. Data written to", output_file)
