import { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthProvider';
import LoginVisibleProvider from './contexts/LoginContext';

const HomePage = lazy(() => import('./Pages/HomePage/HomePage'));
const AllRecipesPage = lazy(() => import('./Pages/AllRecipesPage/AllRecipesPage'));
const RecipeDetailPage = lazy(() => import('./Pages/RecipeDetailPage/RecipeDetailPage'));
const CreateRecipe = lazy(() => import('./Pages/CreateRecipe/CreateRecipe'))

import Header from './MainComponents/Header/Header';
import Footer from './MainComponents/Footer/Footer';

import './App.css';
import { CircularProgress } from '@mui/material';
import Path from './paths';
import CreateRecipeProvider from './contexts/CreateRecipeProvider';
import QueryContextProvider from './contexts/QueryContext';
import DietPage from './Pages/DietPage/DietPage';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import ObscureCategoryPage from './Pages/ObscureCategoryPage/ObscureCategoryPage';
import ObscureDietPage from './Pages/ObscureDietPage/ObscureDietPage';
import LeaderboardsPage from './Pages/LeaderboardsPage/LeaderboardsPage';

function App() {

    return (
        <AuthProvider>
            <LoginVisibleProvider>
                <CreateRecipeProvider>
                    <QueryContextProvider>
                        <Header />
                        <Suspense fallback={<CircularProgress />}>
                            <Routes>
                                <Route path={Path.Home} element={<HomePage />} />
                                <Route path={Path.Recipes} element={<AllRecipesPage />} />
                                <Route path={`${Path.Recipes}/:id`} element={<RecipeDetailPage />} />
                                <Route path={Path.CreateRecipe} element={<CreateRecipe />} />
                                <Route path={Path.Diet} element={<ObscureDietPage />} />
                                <Route path={`${Path.Diet}/:id`} element={<DietPage />} />
                                <Route path={Path.Category} element={<ObscureCategoryPage />} />
                                <Route path={`${Path.Category}/:id`} element={<CategoryPage />} />
                                <Route path={Path.Leaderboards} element={<LeaderboardsPage />} />
                            </Routes>
                        </Suspense>
                        <Footer />
                    </QueryContextProvider>
                </CreateRecipeProvider>
            </LoginVisibleProvider>
        </AuthProvider>
    )
}

export default App
