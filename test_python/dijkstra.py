import heapq

mygraph = {
    'A': {'B': 8, 'C': 1, 'D': 2},
    'B': {},
    'C': {'B': 5, 'D': 2},
    'D': {'E': 3, 'F': 5},
    'E': {'F': 1},
    'F': {'A': 5}
}

def dijkstra(graph, start):
    distances = {node: float('inf') for node in mygraph}
    distances[start] = 0 # return value

    queue = list() # for while loof

    heapq.heappush(queue,[distances[start], start]) # [0, 'A']

    while queue:
        distance, current_node = heapq.heappop(queue)

        for 


