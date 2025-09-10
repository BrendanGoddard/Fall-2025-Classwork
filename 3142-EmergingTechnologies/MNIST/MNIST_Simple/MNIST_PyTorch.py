import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms

# Set device to GPU if available, otherwise use CPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(device)

# Hyperparameters
input_size = 28 * 28          # Size of input images (28x28 pixels, flattened)
hidden_size = 128             # Number of neurons in the hidden layer
num_classes = 10              # Digits 0 through 9
num_epochs = 40                # Number of training epochs
batch_size = 64               # Number of samples per training batch
learning_rate = 0.01          # Learning rate for optimizer

# Define transform to normalize the data
transform = transforms.Compose([
    transforms.ToTensor(),                             # Convert images to PyTorch tensors
    transforms.Normalize((0.1307,), (0.3081,))         # Normalize using MNIST dataset mean and std
])

# Download and load training dataset
train_dataset = torchvision.datasets.MNIST(root='./data', train=True, transform=transform, download=True)

# Download and load test dataset
test_dataset = torchvision.datasets.MNIST(root='./data', train=False, transform=transform)

# Data loaders to provide batches of data
train_loader = torch.utils.data.DataLoader(dataset=train_dataset, batch_size=batch_size, shuffle=True)
test_loader = torch.utils.data.DataLoader(dataset=test_dataset, batch_size=batch_size, shuffle=False)

# Define a simple fully connected neural network
class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)  # First fully connected layer
        self.relu = nn.ReLU()                          # Activation function
        self.fc2 = nn.Linear(hidden_size, num_classes) # Output layer

    def forward(self, x):
        x = x.view(-1, input_size)  # Flatten the 2D image into a 1D vector
        x = self.fc1(x)             # Pass through first layer
        x = self.relu(x)            # Apply ReLU activation
        x = self.fc2(x)             # Pass through output layer
        return x

# Create the model and move it to the selected device
model = SimpleNN(input_size, hidden_size, num_classes).to(device)

# Define loss function and optimizer
criterion = nn.CrossEntropyLoss()            # Suitable for multi-class classification
optimizer = optim.SGD(model.parameters(), lr=learning_rate)  # Stochastic Gradient Descent

# Training loop
for epoch in range(num_epochs):
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        # Forward pass: compute predicted outputs by passing inputs to the model
        outputs = model(images)
        loss = criterion(outputs, labels)

        # Backward pass: compute gradient of the loss with respect to model parameters
        optimizer.zero_grad()  # Clear previous gradients
        loss.backward()        # Backpropagation
        optimizer.step()       # Update weights

    # Print loss for the current epoch
    print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

# Evaluation (testing) phase
model.eval()  # Set model to evaluation mode (disables dropout, etc.)
with torch.no_grad():  # Disable gradient tracking
    correct = 0
    total = 0
    for images, labels in test_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        _, predicted = torch.max(outputs.data, 1)  # Get class with highest probability
        total += labels.size(0)                    # Count total samples
        correct += (predicted == labels).sum().item()  # Count correct predictions

    # Print final test accuracy
    print(f'Accuracy of the model on the 10000 test images: {100 * correct / total:.2f}%')
