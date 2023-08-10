import random

file_path = 'json/players.json'

names = ['Matt', 'Fin', 'Rosie', 'Frankie', 'Ash', 'Zak', 'Jerry', 'Bert', 'Vladi', 'Thomas', 'Bob', 'Steve', 'Jo', 'Kenzie', 'Goerge', 'Eoghan']

def generate_json(): 
    out = '{\n  "Players": [\n    '

    for i in range(len(names)):
        out += f'''
        {{
            "player": "{names[i]}",
            "lawn": {random.randint(1, 10)},
            "clay": {random.randint(1, 10)},
            "hard": {random.randint(1, 10)},
            "rain": {random.randint(1, 10)},
            "dry": {random.randint(1, 10)},
            "snow": {random.randint(1, 10)},
            "sunny": {random.randint(1, 10)},
            "tournaments": 0
        }}'''
        
        if i < len(names) - 1:
            out += ','  # Add a comma after each dictionary except the last one

    out +=  '\n  ]\n}'

    return out
with open(file_path, 'w') as file: 
    file.write(generate_json())