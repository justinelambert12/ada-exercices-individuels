# https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/17_demineur.md
# TODO : Refactor code -> change generation of play_grid by adding the number of bombs around each square which is not a bomb ?
# TODO : add user interface to click on square instead of selecting them in the terminal
# TODO : when click on an empty square (0 bomb around) reveal all empty squares around ?   
import random

def generate_play_grid(nb_row, nb_column, nb_bomb):
    #Grille vide
    grid = []
    for i in range(nb_row):
        row = []
        for j in range(nb_column):
            row.append("0")
        grid.append(row)
    #Cases "bombes" remplies aléatoirement
    nb_filled_cases = 0
    while nb_filled_cases < nb_bomb:
        x = random.randrange(nb_column)
        y = random.randrange(nb_row)
        if (grid[y][x] == "0"):
            grid[y][x] = "X"
            nb_filled_cases+=1

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


def generate_displayed_grid(nb_row, nb_columns):
    grid = []
    for i in range(nb_row):
        row = []
        for j in range(nb_columns):
            row.append("?")
        grid.append(row)
    return grid


def select_square(x, y, grid):
    if (x<len(grid[0]) and y<len(grid)):
        return grid[y][x]
    else:
        print("Coordonnées en-dehors de la grille !")
        return ""


def has_won(play_grid, displayed_grid):
    #Je vérifie que les seules cases non découvertes ("?") qui restent sont celles qui ont des bombes ("X")
    for i in range(len(play_grid)):
        for j in range(len(play_grid[0])):
            if (displayed_grid[i][j] == "?" and play_grid[i][j] != "X"):
                return False
    return True


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


def play():
    nb_row = 3
    nb_column = 5
    nb_bomb = 2

    game_on = True
    play_grid = generate_play_grid(nb_row, nb_column, nb_bomb)
    displayed_grid = generate_displayed_grid(nb_row, nb_column)
    #Tours de jeu
    while (game_on):
        display_grid(displayed_grid)
        display_grid(play_grid)

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
        if (selected_square == "X"):
            displayed_grid[y][x] = selected_square
        else:
            displayed_grid[y][x] = str(nb_bombs_around(x, y, play_grid))
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
        

play()