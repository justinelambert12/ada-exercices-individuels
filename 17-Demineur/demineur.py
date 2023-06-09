# https://github.com/adatechschool/Exercices-individuels-Doria-Shafik-Paris/blob/master/17_demineur.md

def generate_grid(M, N, K):
    grid = []
    for i in range(M):
        row = []
        for j in range(N):
            row.append("0")
        grid.append(row)
    return grid


def display_grid(grid):
    # width = len(grid[0])
    height = len(grid)
    for i in range(height):
        row = grid[i]
        for el in row:
            print(el,end=" ")
        print("\n")


playGrid = generate_grid(3, 5, 0)
display_grid(playGrid)
