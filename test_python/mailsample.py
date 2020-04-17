input_array = [0, 1, 2, 3, 4]
k = 1

def solve(input_array, k):
    temp = list()
    answer = list()

    for _ in range(k):
        key = input_array.pop(0)
        temp.append(key)

    input_array.extend(temp)

    return input_array

print(solve(input_array, k))