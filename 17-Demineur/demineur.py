# https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/17_demineur.md
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


def play():
    game_on = True
    play_grid = generate_play_grid(3, 5, 2)
    displayed_grid = generate_displayed_grid(3, 5)
    display_grid(displayed_grid)
    # display_grid(play_grid)
    #Tours de jeu
    while (game_on):
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
        display_grid(displayed_grid)
        # display_grid(play_grid)
        #Vérification des conditions de victoire ou défaite
        if (selected_square == "X"):
            print("BOOM ! Vous avez perdu.")
            game_on = False
        elif (has_won(play_grid, displayed_grid)):
            print("BRAVO ! Vous avez tout déminé et gagné.")
            game_on = False
        

play()