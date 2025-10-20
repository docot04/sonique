import hashlib

def generate_hashes(peaks,track_id,fanout=7,max_time_delta=5):
    """convers peaks into hashes by creating relationships between them , 
    
    individual peks arent very useful but relationships are unique in songs"""
    hashes = []
    # sorting by time so that process finds time based neigbours efficiently
    peaks_sorted = sorted(peaks,key=lambda x:x[1])

    # use each peaks as anchor
    for i,anchor in enumerate(peaks_sorted):
        # find fanout neigbours
        anchor_freq, anchor_time , anchor_mag = anchor
        # collecting neigbour so that we can form relationship
        neighbours = []
        for j in range(i+1,len(peaks_sorted)):
            target_freq, target_time , target_mag = peaks_sorted[j]
            # setting time constraint because too far relationshops are useless due to less accuracy
            if target_time - anchor_time > max_time_delta:
                break

            neighbours.append((target_freq,target_time,target_mag))

        # generating multiple haes per anchor for better accuracu
        for target_freq,target_time,target_mag in neighbours:
            time_delta = target_time - anchor_time
            # relative timing survices temp changes and audio compression hence also having time_delta
            hash_value = create_hash(anchor_freq,target_freq,time_delta)
            # creating hash from three things as it will make it more unique
            hashes.append({"hash": hash_value, "time": int(anchor_time), "spotify_ID": track_id})
            # storing anchor time because it allows time based alignment during mathcing/identification
    # do something about track id later TODO
    return hashes

def create_hash(freq1,freq2,time_delta):
    """unique hash made by combining three values into a single hash"""
    """this way it will be compact for storage and fast for matching :D"""

    # constraints to avoid overflow or too large numbers
    freq1 = min(freq1,2**10-1) # 10 bits because frequencies are gnernalytl under 1024 bins , bins means divisions in spectrogram , in simple words its like 1024 different frequency levels in a single time frame
    freq2 = min(freq2,2**10-1)
    time_delta = min(time_delta,2**8-1) # 8 bits because time delta is usually small

    # bit packing so that we can create a single unique number from three values
    # format is : freq1(10 bits) | freq2(10 bits) | time_delta(8 bits) , creating 2^36 unique possible combos
    hash_int = (freq1 << 18) | (freq2 << 8) | time_delta # this is what is called bitwise operation and what it does is shifting bits to left by certain positions , for example if freq1 is 5 (which is 0000...0101 in binary) , then shifting it left by 18 positions will make it 0000...010100000000000000000000 , why we do this is because we want to make space for freq2 and time_delta in the final integer representation , which has a size of 36 bits

    # md5 is used because it creates a fixed size hash and hence is eas on database
    return hashlib.md5(str(hash_int).encode()).hexdigest()[:16] # using only first 16 characters for compactness
