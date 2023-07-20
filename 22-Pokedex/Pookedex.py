# https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/22_Pokedex.md
import json
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
    weightInput = pokemon["weight"]
    if type(weightInput) is not float:
        weightValue = float(weightInput.split()[0])
    else:
        weightValue=weightInput
    return weightValue
# print(getPokemonWeight(pokemonTest))
# print(type(getPokemonWeight(pokemonTest)))

def isPokemonHeavierThan(pokemon, minWeight):
    weight = getPokemonWeight(pokemon)
    return weight > minWeight
# print(isPokemonHeavierThan(pokemonTest, 6.8))

def getAllPokemonsHeavierThan(pokemons, minWeight):
    heavyPokemons = []
    for pokemon in pokemons:
        if isPokemonHeavierThan(pokemon, minWeight):
            heavyPokemons.append({"name": getPokemonName(
                pokemon), "weight": getPokemonWeight(pokemon)})
    if len(heavyPokemons) > 0:
        # print(heavyPokemons)
        print(
            f"Il y a {len(heavyPokemons)} pokemons de plus de {minWeight} kg.")
    else:
        print(f"Aucun pokemon ne pese plus de {minWeight} kg !")
    return heavyPokemons
# getAllPokemonsHeavierThan(pokemonTable, 10)

def isPokemonOneHeavierPokemonstwo(pokemonOne, pokemonTwo):
    return getPokemonWeight(pokemonOne)>getPokemonWeight(pokemonTwo)

def sortPokemonByWeight(pokemons):
    while True:
        isSwapped = False
        for j in range(len(pokemons)-1):
            if isPokemonOneHeavierPokemonstwo(pokemons[j],pokemons[j+1]):
                temp = pokemons[j+1]
                pokemons[j+1] = pokemons[j]
                pokemons[j] = temp
                isSwapped = True
        if isSwapped == False:
            break
    return pokemons
# pokemonsHeavierThan100= getAllPokemonsHeavierThan(pokemonTable, 100)
# print(sortPokemonByWeight(pokemonsHeavierThan100))

#ETAPE 3 - Afficher les évolutions d'un pokemon
def getPokemonByName(pokemons,pokemonName):
    for pokemon in pokemons:
        if getPokemonName(pokemon)==pokemonName:
            return pokemon
    return ''
Bulbasaur=getPokemonByName(pokemonTable,'Bulbasaur')
def getNextEvolutionsName(pokemon):
    evolutionNameTable=[]
    evolutions=pokemon['next_evolution']
    for evolution in evolutions:
        evolutionNameTable.append(getPokemonName(evolution))
    return evolutionNameTable
# print(getNextEvolutionsName(Bulbasaur))

def displayPokemonEvolutions(pokemons, pokemonName):
    pokemonEvolutionString=pokemonName
    targetedPokemon = getPokemonByName(pokemons,pokemonName)
    if targetedPokemon=='':
        print('This Pokemon doesn\'t exist')
        return ''
    evolutionsTable = getNextEvolutionsName(targetedPokemon)
    if len(evolutionsTable)>0:
        for evolution in evolutionsTable:
            pokemonEvolutionString +='-->'+evolution
    return pokemonEvolutionString
    
print(displayPokemonEvolutions(pokemonTable,'Ivysaur'))