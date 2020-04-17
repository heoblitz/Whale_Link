int_array = list(map(int, input().strip()[1:-1].split(',')))

hash_dict = {}

for i in int_array:
    if i in hash_dict:
        print(i)
        exit(1)

    hash_dict[i] = "Exist"

