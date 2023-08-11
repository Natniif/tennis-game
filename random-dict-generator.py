import random 

file_path = 'players-dict.js'

names = ['Matt', 'Fin', 'Rosie', 'Frankie', 'Ash', 'Zak', 'Jerry', 'Bert', 'Vladi', 'Thomas', 'Bob', 'Steve', 'Jo', 'Kenzie', 'Goerge', 'Eoghan']

def generate_dict(): 
    out = 'module.exports = {'

    for i in range(len(names)): 
        out += f'''
{names[i]} : {{
    "name": "{names[i]}", 
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
            out += ','

    out += '};'
    return out  

with open(file_path, 'w') as file: 
    file.write(generate_dict())
