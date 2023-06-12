# https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/17_demineur.md
import random

def generate_grid(M, N, K):
    #Grille vide
    grid = []
    for i in range(M):
        row = []
        for j in range(N):
            row.append("0")
        grid.append(row)
    #K cases remplies aléatoirement
    n_filled_cases = 0
    while n_filled_cases < K:
        m = random.randrange(M)
        n = random.randrange(N)
        if (grid[m][n] == "0"):
            grid[m][n] = "X"
            n_filled_cases+=1

    return grid


def display_grid(grid):
    for row in grid:
        for el in row:
            print(el,end=" ")
        print("\n")


def hidden_grid(M, N):
    grid = []
    for i in range(M):
        row = []
        for j in range(N):
            row.append("?")
        grid.append(row)
    return grid


def select_case(x, y, grid):
    if (x<len(grid[0]) and y<len(grid)):
        return grid[y][x]
    else:
        print("Coordonnées en-dehors de la grille !")
        return ""


def play():
    play_grid = generate_grid(3, 5, 2)
    displayed_grid = hidden_grid(3, 5)
    display_grid(displayed_grid)
    #Player turns
    for i in range(3):
        selected_case = ""
        x = 0
        y = 0
        while (selected_case == ""):
            print("Choix de la case à révéler !")
            y = int(input("Choisissez une ligne : "))
            x = int(input("Choisissez une colonne : "))
            selected_case = select_case(x, y, play_grid)
        displayed_grid[y][x] = selected_case
        display_grid(displayed_grid)
        

play()