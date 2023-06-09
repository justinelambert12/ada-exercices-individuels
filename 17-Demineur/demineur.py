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
        x = random.randrange(M)
        y = random.randrange(N)
        if (grid[x][y] == "0"):
            grid[x][y] = "X"
            n_filled_cases+=1

    return grid


def display_grid(grid):
    for row in grid:
        for el in row:
            print(el,end=" ")
        print("\n")


playGrid = generate_grid(3, 5, 2)
display_grid(playGrid)
