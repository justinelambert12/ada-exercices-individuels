# https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/22_Pokedex.md
import json;
f = open("pokemon.json")
# print(f)
data = json.load(f)
# print(data)
pokemonTable = data["pokemon"]
# print(pokemonTable)
pokemonTest = pokemonTable[0]

# Combien de pokemon dans les données ?
def getNumberOfPokemon(pokemons):
    number = len(pokemons)
    print(number)
    return number
# getNumberOfPokemon(pokemonTable)

# Quels sont les pokemon qui pesent plus de 10kg
# on va retourner leurs noms
def getPokemonName(pokemon):
    return pokemon["name"]
# print(getPokemonName(pokemonTest))

def getPokemonWeight(pokemon):
    weightString = pokemon["weight"]
    weightValue = float(weightString.split()[0])
    return weightValue
# print(getPokemonWeight(pokemonTest))
# print(type(getPokemonWeight(pokemonTest)))

def isPokemonHeavierThan(pokemon, minWeight):
    weight = getPokemonWeight(pokemon)
    return weight>minWeight
# print(isPokemonHeavierThan(pokemonTest, 6.8))

def getAllPokemonsHeavierThan(pokemons, minWeight):
    heavyPokemons = []
    for pokemon in pokemons:
        if isPokemonHeavierThan(pokemon, minWeight): 
            heavyPokemons.append({"name": getPokemonName(pokemon), "weight": getPokemonWeight(pokemon)})
    if len(heavyPokemons)>0:
        print(heavyPokemons)
        print(f"Il y a {len(heavyPokemons)} pokemons de plus de {minWeight} kg.")
    else:
        print(f"Aucun pokemon ne pese plus de {minWeight} kg !")
    return heavyPokemons
# getAllPokemonsHeavierThan(pokemonTable, 10)


