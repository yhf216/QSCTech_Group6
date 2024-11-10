from flask import Flask, request, jsonify
import json

app = Flask(__name__)

def load_words():
    with open('CET4.json', 'r', encoding='utf-8') as file:
        return json.load(file)


def save_words(words):
    with open('CET4.json', 'w', encoding='utf-8') as file:
        json.dump(words, file, ensure_ascii=False, indent=4)


@app.route('/words', methods=['GET'])
def get_words():
    words = load_words()
    return jsonify(words)


@app.route('/words/<int:word_id>', methods=['GET'])
def get_word(word_id):
    words = load_words()
    word = next((word for word in words if word['id'] == word_id), None)
    if word is None:
        return jsonify({'error': 'Word not found'}), 404
    return jsonify(word)


@app.route('/words', methods=['POST'])
def add_word():
    data = request.json
    word = data.get('word')
    definition = data.get('definition')
    part_of_speech = data.get('part_of_speech')
    example_sentence = data.get('example_sentence')
    if not word or not definition or not part_of_speech or not example_sentence:
        return jsonify({'error': 'All fields are required'}), 400

    words = load_words()
    new_id = max(word['id'] for word in words) + 1
    new_word = {
        'id': new_id,
        'word': word,
        'definition': definition,
        'part_of_speech': part_of_speech,
        'example_sentence': example_sentence
    }
    words.append(new_word)
    save_words(words)
    return jsonify(new_word), 201


@app.route('/words/<int:word_id>', methods=['PUT'])
def update_word(word_id):
    data = request.json
    word = data.get('word')
    definition = data.get('definition')
    part_of_speech = data.get('part_of_speech')
    example_sentence = data.get('example_sentence')
    if not word and not definition and not part_of_speech and not example_sentence:
        return jsonify({'error': 'At least one field is required'}), 400

    words = load_words()
    word_to_update = next((word for word in words if word['id'] == word_id), None)
    if word_to_update is None:
        return jsonify({'error': 'Word not found'}), 404

    word_to_update.update({
        'word': word or word_to_update['word'],
        'definition': definition or word_to_update['definition'],
        'part_of_speech': part_of_speech or word_to_update['part_of_speech'],
        'example_sentence': example_sentence or word_to_update['example_sentence']
    })
    save_words(words)
    return jsonify({'message': 'Word updated successfully'})


@app.route('/words/<int:word_id>', methods=['DELETE'])
def delete_word(word_id):
    words = load_words()
    words = [word for word in words if word['id'] != word_id]
    save_words(words)
    return jsonify({'message': 'Word deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
