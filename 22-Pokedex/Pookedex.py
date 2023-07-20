# https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/22_Pokedex.md
import json;
f = open("pokemon.json")
# print(f)
data = json.load(f)
# print(data)
pokemonTable = data["pokemon"]
# print(pokemonTable)

# Combien de pokemon dans les données ?
def getNumberOfPokemon(table):
    number = len(table)
    print(number)
    return number
# getNumberOfPokemon(pokemonTable)

