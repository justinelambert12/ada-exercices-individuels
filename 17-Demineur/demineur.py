# https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/17_demineur.md
# TODO : Refactor code 
# TODO : add user interface to click on square instead of selecting them in the terminal
# TODO : when click on an empty square (0 bomb around) reveal all empty squares around ?   
import copy
import random

def generate_empty_grid(nb_row, nb_columns):
    grid = []
    for i in range(nb_row):
        row = []
        for j in range(nb_columns):
            row.append("?")
        grid.append(row)
    return grid


def display_grid(grid):
    print("   ", end="|")
    for i in range(len(grid[0])):
        if (i<10):
            print(" ", i, " ", end="|")
        else:
            print("  "+str(i)+" ", end="|")
    print("\n")
    j = 0
    for row in grid:
        if (j<10):
            print(j, " ", end="|")
        else:
            print(str(j)+" ", end="|")
        for el in row:
            print(" ", el, " ", end=" ")
        print("\n")
        j+=1


def select_square(x, y, grid):
    if (x<len(grid[0]) and y<len(grid)):
        return grid[y][x]
    else:
        print("Coordonnées en-dehors de la grille !")
        return ""


def has_bomb(x, y, grid):
    #Si les coordonnées sont en-dehors de la grille, je renvoie False
    if (x<0 or x>=len(grid[0]) or y<0 or y>=len(grid)):
        return False
    #Sinon je vérifie qu'il y a une bombe
    return (select_square(x, y, grid) == "X")


def nb_bombs_around(x, y, grid):
    nb_bombs = 0
    for i in [x-1, x, x+1]:
        for j in [y-1, y, y+1]:
            if (has_bomb(i, j, grid)):
                nb_bombs += 1
    return nb_bombs


def generate_play_grid(empty_grid, nb_bomb):
    play_grid = copy.deepcopy(empty_grid)
    #Cases "bombes" remplies aléatoirement
    nb_filled_cases = 0
    while nb_filled_cases < nb_bomb:
        x = random.randrange(len(play_grid[0]))
        y = random.randrange(len(play_grid))
        if (play_grid[y][x] != "X"):
            play_grid[y][x] = "X"
            nb_filled_cases+=1
    #Autres cases remplies par le compte de bombes autour (8 cases adjacentes)
    for i in range(len(play_grid)):
        for j in range(len(play_grid[0])):
            if (play_grid[i][j] == "?"):
                play_grid[i][j] = nb_bombs_around(j, i, play_grid)
    return play_grid


def has_won(play_grid, displayed_grid):
    #Je vérifie que les seules cases non découvertes ("?") qui restent sont celles qui ont des bombes ("X")
    for i in range(len(play_grid)):
        for j in range(len(play_grid[0])):
            if (displayed_grid[i][j] == "?" and play_grid[i][j] != "X"):
                return False
    return True


def play():
    nb_row = 5
    nb_column = 5
    nb_bomb = 6

    game_on = True
    displayed_grid = generate_empty_grid(nb_row, nb_column)
    play_grid = generate_play_grid(displayed_grid, nb_bomb)
    #Tours de jeu
    print("--NOUVELLE PARTIE--")
    print(f"Il y a {nb_bomb} bombes à trouver.")
    while (game_on):
        display_grid(displayed_grid)
        # display_grid(play_grid)

        selected_square = ""
        x = 0
        y = 0
        #Choix d'une case à révéler par le joueur
        while (selected_square == ""):
            print("--Choix de la case à révéler--")
            y = int(input("Choisissez une ligne : "))
            x = int(input("Choisissez une colonne : "))
            if (displayed_grid[y][x] != "?"):
                print("Cette case a déjà été révélée.")
            else:
                selected_square = select_square(x, y, play_grid)
        #Révelation de la case
        displayed_grid[y][x] = selected_square
        print("\n")
        #Vérification des conditions de victoire ou défaite
        if (selected_square == "X"):
            print("BOOM ! Vous avez perdu.")
            game_on = False
        elif (has_won(play_grid, displayed_grid)):
            print("BRAVO ! Vous avez tout déminé et gagné.")
            game_on = False
    display_grid(displayed_grid)
    print("--FIN DU JEU--")
    reload = input("Voulez-vous rejouer ? (o/n) : ")
    if (reload == "o"):
        print("\n")
        play()
    

play()